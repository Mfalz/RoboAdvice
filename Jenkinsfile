pipeline {
    agent centOS-slave2 

    stages {
        stage('Build') { 
            steps { 
		sh 'echo build...'
                sh 'mvn spring-boot:run -Dmaven.test.skil=true'
            }
        }
        stage('Test'){
            steps {
		echo 'tests?'
            }
        }
        stage('Deploy') {
            steps {
            	echo 'deploy...'
	    }
        }
    }
}
