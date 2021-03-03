pipeline {
  agent {
    docker { image 'node:14-alpine'}
  
  }
  

    parameters {
        string(name:'TAG_NAME',defaultValue: '',description:'')
    }

    environment {
        DOCKER_CREDENTIAL_ID = 'dockerhub-id'
        GITHUB_CREDENTIAL_ID = 'github-id'
        KUBECONFIG_CREDENTIAL_ID = 'demo-kubeconfig'
        REGISTRY = 'docker.io'
        DOCKERHUB_NAMESPACE = 'enginsgungor'
        GITHUB_ACCOUNT = 'esgungor'
        APP_NAME = 'devops-java-sample'
    }

    stages {
        stage ('checkout scm') {
            steps {
                checkout(scm)
            }
        }

 
        stage ('build & push') {
            steps {
                  sh 'docker build -f Dockerfile -t $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER .'
                  withCredentials([usernamePassword(passwordVariable : 'DOCKER_PASSWORD' ,usernameVariable : 'DOCKER_USERNAME' ,credentialsId : "$DOCKER_CREDENTIAL_ID" ,)]) {
                  sh 'echo "$DOCKER_PASSWORD" | docker login $REGISTRY -u "$DOCKER_USERNAME" --password-stdin'
                  sh 'docker push  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER'
                    
                }
            }
        }

        stage('push latest'){
           when{
             branch 'master'
           }
           steps{
                
                sh 'docker tag  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:latest '
                sh 'docker push  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:latest '
                
           }
        }

        stage('deploy to dev') {
          when{
            branch 'master'
          }
          steps {
            
            kubernetesDeploy(configs: 'deployment-files/**', enableConfigSubstitution: true, kubeconfigId: "$KUBECONFIG_CREDENTIAL_ID")
          }
        }
        
    }
}