<?php
if (!defined("_ECRIRE_INC_VERSION")) return;

include_spip('inc/cextras');
include_spip('base/theme_websimple');

function theme_websimple_upgrade($nom_meta_base_version,$version_cible) {

	$maj = array();
	cextras_api_upgrade(theme_websimple_declarer_champs_extras(), $maj['create']);
	cextras_api_upgrade(theme_websimple_declarer_champs_extras(), $maj['0.0.2']);

	include_spip('base/upgrade');
	maj_plugin($nom_meta_base_version, $version_cible, $maj);

}

function theme_websimple_vider_tables($nom_meta_base_version) {
	cextras_api_vider_tables(theme_websimple_declarer_champs_extras());
	effacer_meta($nom_meta_base_version);
}
