pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'localhost:5000' 
        DOCKER_IMAGE_USER = 'localhost:5000/user-service' 
        DOCKER_IMAGE_PRODUCT = 'localhost:5000/product-service' 
        DOCKER_IMAGE_ORDER = 'localhost:5000/order-service'
    }

    stages {
        stage('Checkout') {
            steps {
                dir('C:/Users/saisa/OneDrive/Desktop/spider/spider_sw_task2/spiderTask-2') {
                    script {
                        if (!fileExists('.git')) {
                            sh 'git init'
                        }
                        sh 'git fetch'
                        sh 'git checkout -f'
                    }
                }
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