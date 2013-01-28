<?php

if (!defined("_ECRIRE_INC_VERSION")) return;

function theme_websimple_jqueryui_plugins($scripts){
   $scripts[] = 'jquery.ui.draggable';
   $scripts[] = "jquery.ui.widget";
   $scripts[] = "jquery.ui.mouse";
   $scripts[] = "jquery.ui.sortable";
   return $scripts;
}

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
    if(($form == 'editer_client' OR $form='inscription_client')
         and _request('page') == 'selection'
         and include_spip('inc/paniers')
         and $id_panier=paniers_id_panier_encours()
       ){
        // On recupere d'abord toutes les informations dont on va avoir besoin
        // Deje le visiteur connecte
        $id_auteur = session_get('id_auteur');
        if(!$id_auteur){
            include_spip('inc/auth');
            $id_auteur=$flux['data']['id_auteur'];
            $auteur=sql_fetsel('*','spip_auteurs','id_auteur='.$id_auteur);
            auth_loger($auteur);
        }
            
        echo serialize($flux['data']);
        echo $id_auteur;    
        // On cree la commande ici
        include_spip('inc/commandes');
        $id_commande = creer_commande_encours();
        
        // On cherche l'adresse principale du visiteur
        $id_adresse = sql_getfetsel('id_adresse',  'spip_adresses_liens',
                         array( 'objet = '.sql_quote('auteur'),
                        'id_objet = '.intval($id_auteur),
                        'type = '.sql_quote('principale') ) );
        
        $adresse = sql_fetsel('*', 'spip_adresses', 'id_adresse = '.$id_adresse);
        unset($adresse['id_adresse']);
        
        // On copie cette adresse comme celle de facturation
        $id_adresse_facturation = sql_insertq('spip_adresses', $adresse);
        sql_insertq( 'spip_adresses_liens',
                        array( 'id_adresse' => $id_adresse_facturation,
                                'objet' => 'commande',
                                'id_objet' => $id_commande,
                                'type' => 'facturation' ) );
    
        // On copie cette adresse comme celle de livraison
        $id_adresse_livraison = sql_insertq('spip_adresses', $adresse);
        sql_insertq( 'spip_adresses_liens',
                        array( 'id_adresse' => $id_adresse_livraison,
                                'objet' => 'commande',
                                'id_objet' => $id_commande,
                                'type' => 'livraison' ) );
       
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
            foreach($panier as $emplette){
                $prix_ht = $fonction_prix_ht($emplette['objet'], $emplette['id_objet']);
                $prix = $fonction_prix($emplette['objet'], $emplette['id_objet']);
                $taxe = round(($prix - $prix_ht) / $prix_ht, 3);
                sql_insertq(
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
                );
            }
        }
                                
         //Supprimer le panier en cours
        $panier=charger_fonction('supprimer_panier_encours','action/');
        $panier();
        $flux['data']['id_commande']=$id_commande;
        $flux['data']['editable']=false;        
        $flux['data']['message_ok']='ok';        
    }
    return($flux);
}

function theme_websimple_recuperer_fond($flux){
    //insérer le ajaxreload dans le formualaire editer_client
    $fond=$flux['args']['fond'];
    if (($fond == 'formulaires/editer_client' OR $fond=='formulaires/inscription_client')){
        $login = pipeline('social_login_links', '');
        $flux['data']['texte'] .= recuperer_fond('inclure/ajaxreload');
    }
    return $flux;
}

function theme_websimple_pre_insertion($flux){
    $table=$flux['args']['table'];
   if (($table=='spip_commandes') AND _request('page')=='selection'){
       echo serialize($flux);
        //definir le statut
        $flux['data']['statut'] = 'attente';
        }
return $flux;
}


?>