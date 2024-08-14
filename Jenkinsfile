pipeline {
    agent any

    environment {
        // Define any environment variables needed for the pipeline
        REGISTRY = "localhost:5000"
        USER_SERVICE_IMAGE = "${REGISTRY}/user-service"
        PRODUCT_SERVICE_IMAGE = "${REGISTRY}/product-service"
        ORDER_SERVICE_IMAGE = "${REGISTRY}/order-service"
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout your source code from version control
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Get the workspace path in the WSL2 environment
                    def workspacePath = sh(returnStdout: true, script: 'pwd').trim()
                    
                    // Build Docker images for each service
                    docker.build("${USER_SERVICE_IMAGE}", "-f ${workspacePath}/user-service/Dockerfile.user ${workspacePath}/user-service")
                    docker.build("${PRODUCT_SERVICE_IMAGE}", "-f ${workspacePath}/product-service/Dockerfile.product ${workspacePath}/product-service")
                    docker.build("${ORDER_SERVICE_IMAGE}", "-f ${workspacePath}/order-service/Dockerfile.order ${workspacePath}/order-service")
                }
            }
        }

        stage('Run Unit Tests') {
            steps {
                script {
                    def workspacePath = sh(returnStdout: true, script: 'pwd').trim()
                    
                    // Run unit tests inside Docker containers
                    docker.image("${USER_SERVICE_IMAGE}").inside("-v ${workspacePath}:${workspacePath} -w ${workspacePath}/user-service") {
                        sh 'npm test'
                    }

                    docker.image("${PRODUCT_SERVICE_IMAGE}").inside("-v ${workspacePath}:${workspacePath} -w ${workspacePath}/product-service") {
                        sh 'npm test'
                    }

                    docker.image("${ORDER_SERVICE_IMAGE}").inside("-v ${workspacePath}:${workspacePath} -w ${workspacePath}/order-service") {
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    // Push the Docker images to a local or remote registry
                    docker.withRegistry("http://${REGISTRY}") {
                        docker.image("${USER_SERVICE_IMAGE}").push()
                        docker.image("${PRODUCT_SERVICE_IMAGE}").push()
                        docker.image("${ORDER_SERVICE_IMAGE}").push()
                    }
                }
            }
        }
    }

    post {
        always {
            // Clean up Docker containers after the pipeline finishes
            cleanWs()
        }
    }
}

