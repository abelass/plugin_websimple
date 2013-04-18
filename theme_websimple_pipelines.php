<?php
if (!defined("_ECRIRE_INC_VERSION")) return;

function theme_websimple_insert_head($flux){
   //$flux .= '<script type="text/javascript"  src="'.find_in_path('websimple.js','javascript').'"></script>';
    //$flux .= '<link type="text/css" href="'.find_in_path('habillage.css','css').'" rel="stylesheet"/>n';    
    return $flux;
}

/*function theme_websimple_jqueryui_plugins($scripts){
   $scripts[] = 'jquery.ui.draggable';
   $scripts[] = "jquery.ui.widget";
   $scripts[] = "jquery.ui.mouse";
   $scripts[] = "jquery.ui.sortable";
   $scripts[] = "jquery.ui.resizable";   
   return $scripts;
}*/

function theme_websimple_formulaire_charger($flux){
 $form=$flux['args']['form'];
 // cré un contact si pas encore existant
 if($form == 'inscription_client'
         and _request('page') == 'selection'
       ){
    if($id_auteur = verifier_session()){
        $inscrire_client = charger_fonction('traiter','formulaires/inscription_client');
        $inscrire_client();
        }
    }
     return($flux);
}

function theme_websimple_formulaire_traiter($flux){
    // Si on est sur le formulaire client qui est sur la page identification
    $form=$flux['args']['form'];
    if(($form == 'editer_client' OR $form=='inscription_client')
         and _request('page') == 'selection'
         and include_spip('inc/paniers')
         and $id_panier=paniers_id_panier_encours()
       ){
        // On recupere d'abord toutes les informations dont on va avoir besoin
        // Deje le visiteur connecte
        $id_auteur = session_get('id_auteur');

        // On cree la commande ici
        include_spip('inc/commandes');
        $id_commande = creer_commande_encours();
        
                // Si inscription on rajoute l'id_auteur
        if(!$id_auteur){
            $id_auteur=$flux['data']['id_auteur'];
           include_spip('action/editer_commande');
           editer_commande_details($id_commande, array('id_auteur' => $id_auteur));
            }  
        
        // On récupère le contenu du panier
        $panier = sql_allfetsel(
            '*',
            'spip_paniers_liens',
            'id_panier = '.$id_panier
        );
        
        // Pour chaque élément du panier, on va remplir la commande
        if ($panier and is_array($panier)){
            include_spip('spip_bonux_fonctions');
            $fonction_prix = charger_fonction('prix', 'inc/');
            $fonction_prix_ht = charger_fonction('ht', 'inc/prix');
            foreach($panier as $cle=>$emplette){
                $panier[$cle]['prix_ht'] = $fonction_prix_ht($emplette['objet'], $emplette['id_objet']);
                $panier[$cle]['prix'] = $fonction_prix($emplette['objet'], $emplette['id_objet']);
                $panier[$cle]['taxe'] = round(($panier[$cle]['prix'] - $panier[$cle]['prix_ht']) / $panier[$cle]['prix_ht'], 3);
                $panier[$cle]['descriptif'] = supprimer_numero(generer_info_entite($emplette['id_objet'], $emplette['objet'], 'titre', '*'));              
                
                /*sql_insertq(
                    'spip_commandes_details',
                    array(
                        'id_commande' => $id_commande,
                        'objet' => $emplette['objet'],
                        'id_objet' => $emplette['id_objet'],
                        'descriptif' => generer_info_entite($emplette['id_objet'], $emplette['objet'], 'titre', '*'),
                        'quantite' => $emplette['quantite'],
                        'prix_unitaire_ht' => $prix_ht,
                        'taxe' => $taxe
                    )
                );*/
            }
        }
         //On envoie la confirmation
        include_spip('inc/config');
        $config = lire_config('commandes');       
         $notifications = charger_fonction('notifications', 'inc', true);
        
        // Determiner l'expediteur
        $options = array('commande'=>$panier);
        if( $config['expediteur'] != "facteur" )
            $options['expediteur'] = $config['expediteur_'.$config['expediteur']];

        // Envoyer au vendeur et au client
        $notifications('commande_vendeur', $id_commande, $options);
        if($config['client'])
            $notifications('commande_client', $id_commande, $options);

       // On récupère le contenu du panier
        $panier = sql_allfetsel(
            '*',
            'spip_paniers_liens',
            'id_panier = '.$id_panier
        );                               
         //Supprimer le panier en cours
        $panier=charger_fonction('supprimer_panier_encours','action/');
        $panier();
        $flux['data']['id_commande']=$id_commande;
        $flux['data']['editable']=false;        
        $flux['data']['message_ok']=_T('websimple:commande_enregistre'); 
        if($form='inscription_client') $flux['data']['retour_inscription']='ok';('websimple:commande_enregistre');          
    }
    return($flux);
}

function theme_websimple_recuperer_fond($flux){
    //insérer le ajaxreload dans le formualaire editer_client
    $fond=$flux['args']['fond'];
    if (($fond == 'formulaires/editer_client' OR $fond=='formulaires/inscription_client')){
       $contexte=$flux['args']['contexte'];
        $flux['data']['texte'] .= recuperer_fond('inclure/ajaxreload',$contexte);
    }
    return $flux;
}

function theme_websimple_pre_insertion($flux){
    $table=$flux['args']['table'];
   if (($table=='spip_commandes') AND _request('page')=='selection'){
        //definir le statut
        $flux['data']['statut'] = 'attente';
        }
return $flux;
}
?>