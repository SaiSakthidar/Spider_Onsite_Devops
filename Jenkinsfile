pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
        DOCKER_REGISTRY = 'your-docker-registry'
        DOCKER_IMAGE_USER = 'your-docker-image-user'
        DOCKER_IMAGE_PRODUCT = 'your-docker-image-product'
        DOCKER_IMAGE_ORDER = 'your-docker-image-order'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://your-repo-url.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    docker.build("${env.DOCKER_IMAGE_USER}", './user-service')
                    docker.build("${env.DOCKER_IMAGE_PRODUCT}", './product-service')
                    docker.build("${env.DOCKER_IMAGE_ORDER}", './order-service')
                }
            }
        }

        stage('Run Unit Tests') {
            steps {
                script {
                    docker.image("${env.DOCKER_IMAGE_USER}").inside {
                        sh 'npm install'
                        sh 'npm test'
                    }
                    docker.image("${env.DOCKER_IMAGE_PRODUCT}").inside {
                        sh 'npm install'
                        sh 'npm test'
                    }
                    docker.image("${env.DOCKER_IMAGE_ORDER}").inside {
                        sh 'npm install'
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry("https://${env.DOCKER_REGISTRY}", "${env.DOCKER_CREDENTIALS_ID}") {
                        docker.image("${env.DOCKER_IMAGE_USER}").push()
                        docker.image("${env.DOCKER_IMAGE_PRODUCT}").push()
                        docker.image("${env.DOCKER_IMAGE_ORDER}").push()
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yml up -d'
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}