/*charger les templates appeleés*/
$(function() { 
	$(".mouseover").mouseover(function() {
		var attr=$(this).attr('data-target').split('-');   
		var objet=attr[0];
		var id_objet=attr[1];
		var composition=attr[2];
		var id_groupe=attr[3];		
		var id=objet+'_'+id_objet;
		ajaxReload(
			'content', 
				{args:{
		               'type-page':objet,
		               id_rubrique:id_objet,
		               composition:composition,
		               reload:'oui',
		               id_groupe:id_groupe
		                }
		         }
		    );
	  	});	
 });

