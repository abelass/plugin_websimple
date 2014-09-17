<?php
if (!defined("_ECRIRE_INC_VERSION")) return;

// Le traffic HTTP est redirige en HTTPS

if (
        (!$_SERVER['HTTPS']) AND
        ($_SERVER['REQUEST_METHOD'] == 'GET')
        ) {
        include_spip('inc/headers');
        redirige_par_entete('https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
  echo 'ok';
}
?>
