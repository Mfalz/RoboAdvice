pipeline {
    agent any 

    stages {
        stage('Build') { 
            steps { 
		sh 'echo build...'
                sh './start.sh'
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
