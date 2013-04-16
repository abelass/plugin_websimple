<?php
if (!defined("_ECRIRE_INC_VERSION")) return;

function formulaires_inscription_client_saisies($retour=''){
    $mode = tester_config(0);
    
    $conf=lire_config('clients/elm',array());
    
    $civilite=array();  
    $type_c = lire_config('clients/type_civ','i');
    
    if($type_c == 'c'){
        $civ=lire_config('clients/elm_civ',array('madame', 'monsieur'));
        $civ_t=array();
        if (in_array("civilite", $conf)) {      
            foreach($civ as $v){
                array_push($civ_t, "<:clients:label_$v:>");
            }
            $civ_t = array_combine($civ, $civ_t);
            $civilite=array(
                'saisie' => 'radio',
                'options' => array(
                    'nom' => 'civilite',
                    'label' => _T('contacts:label_civilite'),
                    'obligatoire' => in_array("obli_civilite", $conf) ? 'oui' : '',
                    'datas' => $civ_t
                )
            );
        }
    }else{
        if (in_array("civilite", $conf)) {
            $civilite=array(
                'saisie' => 'input',
                'options' => array(
                    'nom' => 'civilite',
                    'label' => _T('contacts:label_civilite'),
                    'obligatoire' => in_array("obli_civilite", $conf) ? 'oui' : '',
                )
            );
        }
    }
    
    $numero=array();
    if (in_array("numero", $conf)) {
        $numero=array(
            'saisie' => 'input',
            'options' => array(
                'nom' => 'numero',
                'label' => _T('clients:label_tel'),
                'obligatoire' => in_array("obli_numero", $conf) ? 'oui' : '',
            )
        );
    }
    
    $portable=array();
    if (in_array("portable", $conf)) {
        $portable=array(
            'saisie' => 'input',
            'options' => array(
                'nom' => 'portable',
                'label' => _T('clients:label_portable'),
                'obligatoire' => in_array("obli_portable", $conf) ? 'oui' : '',
            )
        );
    }

    $fax=array();
    if (in_array("fax", $conf)) {
        $fax=array(
            'saisie' => 'input',
            'options' => array(
                'nom' => 'fax',
                'label' => _T('clients:label_fax'),
                'obligatoire' => in_array("obli_fax", $conf) ? 'oui' : '',
            )
        );
    }

    $complement=array();
    if (in_array("complement", $conf)) {
        $complement=array(
            'saisie' => 'input',
            'options' => array(
                'nom' => 'complement',
                'label' => _T('coordonnees:label_complement'),
                'obligatoire' => in_array("obli_complement", $conf) ? 'oui' : '',
            )
        );
    }
    
    $pays=array();
    if (in_array("pays", $conf)) {
        $pays=array(
            'saisie' => 'pays',
            'options' => array(
                'nom' => 'pays',                
                'code_pays' => 'oui',
                'label' => _T('coordonnees:label_pays'),
                'obligatoire' => in_array("obli_pays", $conf) ? 'oui' : '',
            )
        );
    }
    
    return array(
        $civilite,
        array(
            'saisie' => 'input',
            'options' => array(
                'nom' => 'prenom',
                'label' => _T('contacts:label_prenom'),
                'obligatoire' => 'oui'
            )
        ),
        array(
            'saisie' => 'input',
            'options' => array(
                'nom' => 'nom',
                'label' => _T('contacts:label_nom'),
                'obligatoire' => 'oui'
            )
        ),
        array(
            'saisie' => 'input',
            'options' => array(
                'nom' => 'mail_inscription',
                'label' => _T('contacts:label_email'),
                'obligatoire' => 'oui'
            ),
            'verifier' => array(
                'type' => 'email'
            )
        ),
        $numero,
        $portable,
        $fax,
        array(
            'saisie' => 'input',
            'options' => array(
                'nom' => 'voie',
                'label' => _T('coordonnees:label_voie'),
                'obligatoire' => ''
            )
        ),
        $complement,
        array(
            'saisie' => 'input',
            'options' => array(
                'nom' => 'code_postal',
                'label' => _T('coordonnees:label_code_postal'),
                'obligatoire' => ''
            )
        ),
        array(
            'saisie' => 'input',
            'options' => array(
                'nom' => 'ville',
                'label' => _T('coordonnees:label_ville'),
                'obligatoire' => ''
            )
        ),
        $pays
    );
}


function formulaires_editer_client_saisies($id_auteur, $retour=''){
    $conf=lire_config('clients/elm',array());
    
    $civilite=array();
    $type_c = lire_config('clients/type_civ','i');
    
    if($type_c == 'c'){     
        $civ=lire_config('clients/elm_civ',array('madame', 'monsieur'));    
        $civ_t=array();
        if (in_array("civilite", $conf)) {      
            foreach($civ as $v){
                array_push($civ_t, "<:clients:label_$v:>");
            }
            $civ_t = array_combine($civ, $civ_t);
            $civilite=array(
                'saisie' => 'radio',
                'options' => array(
                    'nom' => 'civilite',
                    'label' => _T('contacts:label_civilite'),
                    'obligatoire' => in_array("obli_civilite", $conf) ? 'oui' : '',
                    'datas' => $civ_t
                )
            );
        }
    }else{
        if (in_array("civilite", $conf)) {
            $civilite=array(
                'saisie' => 'input',
                'options' => array(
                    'nom' => 'civilite',
                    'label' => _T('contacts:label_civilite'),
                    'obligatoire' => in_array("obli_civilite", $conf) ? 'oui' : '',
                )
            );
        }
    }
    
    $numero=array();
    if (in_array("numero", $conf)) {
        $numero=array(
            'saisie' => 'input',
            'options' => array(
                'nom' => 'numero',
                'label' => _T('clients:label_tel'),
                'obligatoire' => in_array("obli_numero", $conf) ? 'oui' : '',
            )
        );
    }
    
    $portable=array();
    if (in_array("portable", $conf)) {
        $portable=array(
            'saisie' => 'input',
            'options' => array(
                'nom' => 'portable',
                'label' => _T('clients:label_portable'),
                'obligatoire' =>  in_array("obli_portable", $conf) ? 'oui' : '',
            )
        );
    }
    
    $fax=array();
    if (in_array("fax", $conf)) {
        $fax=array(
            'saisie' => 'input',
            'options' => array(
                'nom' => 'fax',
                'label' => _T('clients:label_fax'),
                'obligatoire' => in_array("obli_fax", $conf) ? 'oui' : ''
            )
        );
    }
        
    $complement=array();
    if (in_array("complement", $conf)) {
        $complement=array(
            'saisie' => 'input',
            'options' => array(
                'nom' => 'complement',
                'label' => _T('coordonnees:label_complement'),
                'obligatoire' => in_array("obli_complement", $conf) ? 'oui' : '',
            )
        );
    }
    
    $pays=array();
    if (in_array("pays", $conf)) {
        $pays=array(
            'saisie' => 'pays',
            'options' => array(
                'nom' => 'pays',                
                'code_pays' => 'oui',
                'label' => _T('coordonnees:label_pays'),
                'obligatoire' => in_array("obli_pays", $conf) ? 'oui' : '',
            )
        );
    }
    
    return array(
        $civilite,
        array(
            'saisie' => 'input',
            'options' => array(
                'nom' => 'prenom',
                'label' => _T('contacts:label_prenom'),
                'obligatoire' => 'oui'
            )
        ),
        array(
            'saisie' => 'input',
            'options' => array(
                'nom' => 'nom',
                'label' => _T('contacts:label_nom'),
                'obligatoire' => 'oui'
            )
        ),
        array(
            'saisie' => 'input',
            'options' => array(
                'nom' => 'email_rien',
                'label' => _T('contacts:label_email'),
                'disable' => 'oui',
            ),
            'verifier' => array(
                'type' => 'email'
            )
        ),
        $numero,
        $portable,
        $fax,
        array(
            'saisie' => 'input',
            'options' => array(
                'nom' => 'voie',
                'label' => _T('coordonnees:label_voie'),
                'obligatoire' => ''
            )
        ),
        $complement,
        array(
            'saisie' => 'input',
            'options' => array(
                'nom' => 'code_postal',
                'label' => _T('coordonnees:label_code_postal'),
                'obligatoire' => ''
            )
        ),
        array(
            'saisie' => 'input',
            'options' => array(
                'nom' => 'ville',
                'label' => _T('coordonnees:label_ville'),
                'obligatoire' => ''
            )
        ),
        $pays
    );
}
?>