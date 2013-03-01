//Les variables
	var count=0;
	var objet_flotable='floating_box';
	var objet_id='floating-box';
	var container_flotable=".flottable";
	var data_target="float";
	var dock=".fenetre";
	var dock_id="fenetre";					
	//le statut par défaut
	 if ($.cookie('move')) {
	 	var statut=$.cookie('move');
	 	}
	 else{
	 	var statut='off';
	 	}	

$(document).ready(function(){

	//Mettre en pace les controles
	$("section.page").on("chargerPanel", function(){
		$(this).prepend('<aside class="control_box"><div class="move"></div></aside>');
	});
	$("section.page").trigger("chargerPanel"); 	

	$('aside.control_box .move').addClass(statut);
	 if(statut=="off"){
	 	moveOff();
	 	
	 }
	 else{
		preparerFlottables();
		moveOn();
	 }
	 
	//Désactiver l'interface move
	$('.control_box').on('click','.off',function(){
		var id= $('body').attr('data-id');
		var comp= $('body').attr('data-comp');	
		var type= $('body').attr('class');	
		if(id && type) $('section#content').load(
            '/spip.php?action=charger_squelette&squelette=content/'+type+'&faq=faq&id_'+type+'='+id+'&composition='+comp,'',function(){
			     //acordeon  				        
			   	$('dl.faq > dt').addClass("close").click(function(){
					$(this).toggleClass("close").next().toggle('fast');
					return false;
					}).next().hide();
				
				//Ouvrir et fermer la fenêtre depuis le lien
				$('a[data-target="'+data_target+'"]').click(function() {
					var id=$(this).attr('id').split('_');   
				    var id_article=id[1];
				    var id_article_base=$(this).attr('data-base');
				    var statut=$(this).attr('class');
				    var panier=$(this).attr('data-panier');   
				    var faq=$(this).attr('data-faq'); 
				    var fenetre=$(this).attr('data-fenetre'); 
				    var statut_fenetre=$(this).attr('data-statut'); 
			   
				    chargerFenetre(id_article,id_article_base,statut,panier,faq,fenetre,statut_fenetre);  
				   return false;
				}); 	
	    
             	}
             	
             );	
		moveOff();
		});
		
	//Activer le draggable
	$('.control_box').on('click','.on',function(){
		var id= $('body').attr('data-id');
		var comp= $('body').attr('data-comp');
		var type= $('body').attr('class');		
		if(id && type) $('section#content').load(
            '/spip.php?action=charger_squelette&squelette=content/'+type+'&faq=flottable&id_'+type+'='+id+'&composition='+comp,'',function(){
			    preparerFlottables();

				//Ouvrir et fermer la fenêtre depuis le lien
				$('a[data-target="'+data_target+'"]').click(function() {
					var id=$(this).attr('id').split('_');   
				    var id_article=id[1];
				    var id_article_base=$(this).attr('data-base');
				    var statut=$(this).attr('class');
				    var panier=$(this).attr('data-panier');   
				    var faq=$(this).attr('data-faq'); 
				    var fenetre=$(this).attr('data-fenetre'); 
				    var statut_fenetre=$(this).attr('data-statut'); 
			   
				    chargerFenetre(id_article,id_article_base,statut,panier,faq,fenetre,statut_fenetre);  
				   return false;
				}); 	

             	}
             	
             );				
		
		moveOn();
	});
	 

});

$(function() { 
	//Ouvrir et fermer la fenêtre depuis le lien
	$('a[data-target="'+data_target+'"]').click(function() {
		var id=$(this).attr('id').split('_');   
	    var id_article=id[1];
	    var id_article_base=$(this).attr('data-base');
	    var statut=$(this).attr('class');
	    var panier=$(this).attr('data-panier');   
	    var faq=$(this).attr('data-faq'); 
	    var fenetre=$(this).attr('data-fenetre'); 
	    var statut_fenetre=$(this).attr('data-statut'); 
   
	    chargerFenetre(id_article,id_article_base,statut,panier,faq,fenetre,statut_fenetre);  
	   return false;
	}); 	
 });

function preparerFlottables(){
	//Mis en plus de la structure de fenêtres flottables
	$(container_flotable).each(function(){   
   		count=count+1;
   		$('aside.fenetres').append('<div class="fenetre_container fenetre_option" id="objet_'+count+'"><div class="fenetre" id="fenetre_'+count+'" data-fenetre="'+count+'" style="z-index:500;"><div class="panneau">texte</div></div></div>');
   		 $('#fenetre_'+count).resizable({ animateEasing: "easeOutBounce" });
   		//donner l'attribut de la fenetre
   		$(this).find( 'a.closed').each(function(){ 
   			$(this).attr('data-fenetre',count);

   		});
	 });
	$(dock).hide('fast');
	
}

//Enlever l'effet move	
 function moveOff() {
 	$('aside.fenetres .fenetre_option').remove();
	 $('aside.control_box .move').removeClass('off').addClass('on');
	 $.cookie('move','off', { expires: 365 , path: '/' });
	};
	

	
//Moveon selon cookies	     	
 function moveOn() {

 	var count=0;
 	//Les docs
	var dock_left=[];
	var dock_top=[]; 

		
	$(dock).each(function(){   
	 	var id=$(this).attr('id'); 
	 	var selector='#'+id;
    	count=count+1;
   		if ($.cookie(selector)) {
        	var coords = $.cookie(selector).split(',');
         } 
        else {
        	var coords = [0,(count-1)*20+'%']; // default top and left
          }    	
		fenetreControle('on',selector,count,coords);
		$(this).css({'z-index':500});
		//Les fenêtres
		var count2=0;				
		 $(selector+' .'+objet_flotable).each(function(){   
		 	var id=$(this).attr('id').split('_');   
	   		var id_article=id[1];
	   		count2=count2+1;
		 	fenetreControle('on','#'+objet_id+'_'+id_article,count2);
		 });
		});	 

	 //Le panier	 
	 fenetreControle('on','#mon_panier'); 		
	 $('aside.control_box .move').removeClass('on').addClass('off');
	 $.cookie('move','on', { expires: 365 , path: '/' });
	 }; 	 	
	 	
// contrôle des fenêtres	
 function fenetreControle(statut_opt,selector,count,coords,fenetre) {
	var coords_def=[count*20+'px',0];	
	if(statut_opt!='undefined')var statut=statut_opt;
 	if(statut=='off'){
		 $(selector).draggable( "disable" );
		 if(count){
	        		if(!coords)var coords = coords_def; // default top and left
	        		$(selector).css({top:coords[0],left:coords[1],opacity:1,position:'absolute'}); 
	        	}
	     else{
	     	fenetresRanger(fenetre,statut);
	     }
				
 	}
 	else{
 		//initialiser le draggable
 		
        $(selector).draggable(
            {
            containment:'html', 
            opacity: 0.35, 
            cursor: 'move',
            start: function( event, ui ) {fenetreUp($(this));},    
            stop: function() {
                    $.cookie(selector,$(selector).css('top')+','+$(selector).css('left'), { expires: 365 , path: '/' });
                  }
             }
        );
        //activé si au cas ou il a été désactivé
		$(selector).draggable( "enable" );
		
        //la position de l'objet	
		if(!coords){
			if ($.cookie(selector)) {
	          var coords = $.cookie(selector).split(',');
	          } 
	        else {
	        	if(count){
	        		var coords = coords_def; // default top and left
	        	}
	          }			
			}
        if(coords){+':visible'
          	$(selector).css({top:coords[0],left:coords[1],position:'absolute'}); 
          }
        else{
        	fenetresRanger(fenetre);
          }		
		}
	
    }; 

//Mettre la fenêtre en avant
 function fenetreUp(elem,index_top,index_bottom) {
 	if(!index_top)var index_top=1001;
 	if(!index_bottom)var index_bottom=1000; 	
	$('.'+objet_flotable).css({'z-index':index_bottom});
	elem.css({'z-index':index_top});
    };
    
//Cacher une fenêtre
function fenetreHide(id_article,fenetre){
   	$('#'+objet_id+'_'+id_article).hide(800, function() {
   		fenetresRanger(fenetre);
   		dockHide(fenetre);
   		});
   		$('#link_'+id_article+' span.open').replaceWith('<span class="close">+</span>');
   		$('#link_'+id_article).removeClass("open").addClass("closed");    		
	};      
    
//Ranger les fenêtres
function fenetresRanger(fenetre,statut){
        	var count=0;
        	
			$('#'+dock_id+'_'+fenetre+' > div.'+objet_flotable+':visible').each(function(){ 
				
				var id=$(this).attr('id').split('_');   
		    	var id_article=id[1];
		    	var selector='#'+objet_id+'_'+id_article;
		    	count=count+1;
		    	
		    if (!statut & $.cookie(selector)) {
          			var coords = $.cookie(selector).split(',');
          		} 
	        else {
					var coords = [count*20+'px',0]; // default top and left
				}
				
				$(selector).css({top:coords[0],left:coords[1],position:'absolute'}); 
			});
	};

//Cacher le dock si pas de contenu
function dockHide(fenetre){
	var d='#'+dock_id+'_'+fenetre;
	if($(d+' > div.'+objet_flotable+':visible').length == 0 ) {$(d).hide('fast'); }

};


   
 function chargerFenetre(id_article,id_article_base,statut_link,panier,faq,fenetre,statut_fenetre) {	  
	if(statut_link=='closed'){
		//Faire apparare le doc
		$('#'+dock_id+'_'+fenetre).show('fast');  	
		if(statut_fenetre=='actif'){
			$('#'+objet_id+'_'+id_article).show(300,function(){
				fenetresRanger(fenetre);
			});
			 $('#link_'+id_article+' span.close').replaceWith('<span class="open">-</span>');
	         $('#link_'+id_article).removeClass("closed").addClass("open");
	         fenetreUp($('#'+objet_id+'_'+id_article));
	         
		}
		else{ 
			//préparer le cadre html
			var selector=objet_id+'_'+id_article;
	        $('#fenetre_'+fenetre).append(
	        '<div class="floating_box" id="'+selector+'" data-fenetre="'+fenetre+'"style="position:absolute"><div class="panneau"><div class="action_close" id="close_'+id_article+'">X</div></div><div class="floating_content"> </div></div>');
	        //charger le contenu

		var comp= $('body').attr('data-comp');
		var type= $('body').attr('class');		
		if(type)$('#'+objet_id+'_'+id_article+' .floating_content').load(
	            '/spip.php?action=charger_squelette&squelette=content/article&id_article='+id_article+'&forum=non&id_article_base='+id_article_base+'&panier='+panier+'&faq='+faq+'composition='+comp,'',function(){
	            $('#'+selector+' h1').appendTo('#'+selector+' .panneau');
	            	//mettre la fenêtre en avant
	            	fenetreUp($('#'+objet_id+'_'+id_article));
	            	//mettre la fenêtre en avant faire apparaite la fenêtre et modifier le html  
	                $('#'+objet_id+'_'+id_article).show(800,function(){
		                //le rendre draggable
		            	fenetreControle('on','#'+objet_id+'_'+id_article,'','',fenetre);
		            	}
		            );
	                $('#link_'+id_article+' span.close').replaceWith('<span class="open">-</span>');
	                $('#link_'+id_article).removeClass("closed").addClass("open").attr('data-statut','actif');
					//rendre a fenêre resizable
				    $('.'+objet_flotable).resizable({ animateEasing: "easeOutBounce" });
	               // Fermer une fenetre via le x
			        $('.action_close').click(function(){
				    	var id=$(this).attr('id').split('_');   
				        var id_article=id[1];
				        fenetreHide(id_article,fenetre);	 
				        });
				        
	               // mettre la fenêtre active en avant
			        $(dock+' .ui-draggable').click(function(){
			        	fenetreUp($(this)); 
				        });
				      //acordeon  				        
				   	$('#'+selector+' dl.faq > dt').addClass("close").click(function(){
						$(this).toggleClass("close").next().toggle('fast');
						return false;
						}).next().hide();    
	             	}
	             	
	             );
            }
        }
     else{  
     		fenetreHide(id_article,fenetre);	       	 
        }
    };  
        	