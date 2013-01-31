<?php
/**
 * Plugin Signaler des abus
 * (c) 2012 My Chacra
 * Licence GNU/GPL
 */

if (!defined('_ECRIRE_INC_VERSION')) return;

function action_charger_squelette_dist($arg=null) {	

    include_spip('public/assembler');
    $contexte=calculer_contexte();

	echo recuperer_fond($contexte['squelette'],$contexte);


	return ;
}

?>
