<?php
$mdp = "2f130654e39a8728c9cfccaca089cdff2cfa2b15";
$filename = "dataAppli.js";
$pattern = "/var [a-zA-Z0-9 ]* ?= ?/";
$jsVariable = "CONFIG";



/*
		USE :
			
			TO UPDATE DATA =vvv
			
			$.post("editAppli.php",{
					"user":"get",
					"mdp":"74120reblochonsauceaigredouceMEGEVE",
					"json":JSON.stringify({"demain":"2m1"})
				},"json");

				
				#####################################"
				
			TO READ DATA =vvv
			
			$.post("editAppli.php",{
					"action":"get"
				},function(dataJson){
					var CONFIG = JSON.parse(dataJson);
				},"json");

				
			OU
			
			<script type="text/javascript" src="serveur/path/dataAppli.js"></script>

*/


/*echo sha1(md5($mdp));*/

	if(isset($_POST) && isset($_POST["user"]) && isset($_POST["mdp"]) && $_POST["user"] != "" && $_POST["mdp"] != ""){
		
		if(sha1(md5($_POST["mdp"])) == $mdp){
		
			// ON MODIFI CONTENU
			if( isset($_POST["json"]) && $_POST["json"] != ""){
				try{
					$content = utf8_decode($_POST["json"]);
					$fp = fopen($filename, 'w');
					fwrite($fp, "var ".$jsVariable."=".$content.";");
					fclose($fp);
					echo "Enregistrement realise avec succes !";
				}catch(Exception $e){
					echo "Erreur : "+$e->getMessage();
					exit();
				}		
			}
			
		}else{
			echo "Problème d'authentification.";
		}
	}else if( isset($_POST["action"]) && $_POST["action"] == "get" && ! (isset($_POST["json"]) && $_POST["json"] != "")){
		
		// ON RENVOI CONTENU
		$content = file_get_contents ($filename);
		preg_match($pattern, $content, $matches);
		$json = str_replace($matches[0],"",$content);
		if(substr($json,-1) == ";"){
			$json = substr($json,0,-1);
		}
				
		echo json_encode($json);

	}else{
		echo "Erreur.";
	}




?>