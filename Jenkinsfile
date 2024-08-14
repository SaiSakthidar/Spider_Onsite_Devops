pipeline {
    agent any

    environment {
        DOCKER_IMAGE_USER = "localhost:5000/user-service"
        DOCKER_IMAGE_PRODUCT = "localhost:5000/product-service"
        DOCKER_IMAGE_ORDER = "localhost:5000/order-service"
        DOCKER_REGISTRY = "localhost:5000"
    }

    stages {
        stage('Build Docker Images') {
            steps {
                script {
                    docker.build("${env.DOCKER_IMAGE_USER}", '-f ./user-service/Dockerfile.user ./user-service')
                    docker.build("${env.DOCKER_IMAGE_PRODUCT}", '-f ./product-service/Dockerfile.product ./product-service')
                    docker.build("${env.DOCKER_IMAGE_ORDER}", '-f ./order-service/Dockerfile.order ./order-service')
                }
            }
        }

        stage('Run Unit Tests') {
            steps {
                script {
                    // Use Unix-style paths inside the Docker container
                    docker.image("${env.DOCKER_IMAGE_USER}").inside('-v $WORKSPACE:/usr/src/app -w /usr/src/app/user-service') {
                        sh 'npm install'
                        sh 'npm test'
                    }
                    docker.image("${env.DOCKER_IMAGE_PRODUCT}").inside('-v $WORKSPACE:/usr/src/app -w /usr/src/app/product-service') {
                        sh 'npm install'
                        sh 'npm test'
                    }
                    docker.image("${env.DOCKER_IMAGE_ORDER}").inside('-v $WORKSPACE:/usr/src/app -w /usr/src/app/order-service') {
                        sh 'npm install'
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh "echo ${env.DOCKER_PASSWORD} | docker login ${env.DOCKER_REGISTRY} -u ${env.DOCKER_USERNAME} --password-stdin"
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
