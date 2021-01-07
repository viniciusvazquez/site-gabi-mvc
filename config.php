<?php
	require 'environment.php';
	$config = array();

	if (ENVIRONMENT == 'development') {
		define("BASE_URL", "");
		$config['dbname'] = '';
		$config['dbhost'] = '';
		$config['dbuser'] = '';
		$config['dbpass'] = '';
	} else {
		define("BASE_URL", "");
		$config['dbname'] = '';
		$config['dbhost'] = '';
		$config['dbuser'] = '';
		$config['dbpass'] = '';
	}

	global $db;
	try {
		$db = new PDO("mysql:dbname=".$config['dbname']."host=".$config['dbhost'], $config['dbuser'], $config['dbpass']);
	} catch (PDOException $e) {
		echo "ERRO.: ".$e->getMessage();
		exit;
	}