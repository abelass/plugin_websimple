<?php

if (!defined("_ECRIRE_INC_VERSION")) return;

function theme_websimple_jqueryui_plugins($scripts){
   $scripts[] = 'jquery.ui.draggable';
   $scripts[] = "jquery.ui.widget";
   $scripts[] = "jquery.ui.mouse";
   $scripts[] = "jquery.ui.sortable";
   return $scripts;
}

?>