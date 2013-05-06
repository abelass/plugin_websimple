<?php

if (!defined("_ECRIRE_INC_VERSION")) return;

 

function theme_websimple_declarer_champs_extras($champs = array()) {

  $champs['spip_syndic']['notre_contribution'] = array(

      'saisie' => 'textarea',//Type du champ (voir plugin Saisies)

      'options' => array(

            'nom' => 'notre_contribution', 

            'label' => _T('websimple:notre_contribution'), 

            'sql' => "text NOT NULL DEFAULT ''",
            'traitements' => '_TRAITEMENT_TYPO',
            'restrictions'=>array('voir' => array('auteur' => ''),//Tout le monde peut voir

                        'modifier' => array('auteur' => 'webmestre')),//Seuls les webmestres peuvent modifier
                        
            'versionner'=>true,
            'rechercher'=>true,
            'multilang'=>true,              
            'class'=>'inserer_barre_edition text',         
      ),

  );

  return $champs;       

}

?>