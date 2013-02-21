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
	 	var statut='on';
	 	}	

$(document).ready(function(){
	//Mis en plus de la structure de fenêtres flottables
	$(container_flotable).each(function(){   
   		count=count+1;
   		$('aside.fenetres').append('<div class="fenetre_container"><div class="fenetre" id="fenetre_'+count+'" data-fenetre="'+count+'"><div class="panneau">texte</div></div></div>');
   		 $('#fenetre_'+count).resizable({ animateEasing: "easeOutBounce" });
   		//donner l'attribut de la fenetre
   		$(this).find( 'a.closed').each(function(){ 
   			$(this).attr('data-fenetre',count);

   		});
	 });
	$(dock).hide('fast');

	 
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
	 	moveOn();
	 }
	 
	//Désactiver le draggable
	$('.control_box').on('click','.off',function(){
		moveOff();
		});
		
	//Activer le draggable
	$('.control_box').on('click','.on',function(){
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

//Enlever l'effet move	
 function moveOff() {
	var count=0;
	//Les docks
	var dock_top=[];	
	var dock_left=[];	
	$(dock).each(function(){   
	 	var id=$(this).attr('id'); 
	 	var selector='#'+id;
    	count=count+1;
        var coords = [0,(count-1)*20+'%']; // default top and left  	
		fenetreControle('off',selector,count,coords);
		});	
	//Les fenêtres		
	$('.'+objet_flotable).each(function(){   
		var id=$(this).attr('id').split('_');   
    	var id_article=id[1];
    	count=count+1;
		fenetreControle('off','#'+objet_id+'_'+id_article,count);
		});
	 //Le panier		
		fenetreControle('off','#mon_panier');					
	 $('aside.control_box .move').removeClass('off').addClass('on');
	 $.cookie('move','off', { expires: 365 , path: '/' });
	};
	
//Activer l'effet move		     	
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
		});	 
 	//Les fenêtres			
	 $('.'+objet_flotable).each(function(){   
	 	var id=$(this).attr('id').split('_');   
   		var id_article=id[1];
   		count=count+1;
	 	fenetreControle('on','#'+objet_id+'_'+id_article,count);
	 });
	 //Le panier	 
	 fenetreControle('on','#mon_panier'); 		
	 $('aside.control_box .move').removeClass('on').addClass('off');
	 $.cookie('move','on', { expires: 365 , path: '/' });
	 }; 
	 	
// contrôle des fenêtres	
 function fenetreControle(statut,selector,count,coords,fenetre) {

 	if(statut=='off'){
		 $(selector).draggable( "disable" );
		 $(selector).css({top:count*20+'px',left:0,opacity:1,position:'absolute'}); 		
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
	        		var coords = [count*20+'px',0]; // default top and left
	        	}
	          }			
			}
        if(coords){
          	$(selector).css({top:coords[0],left:coords[1],position:'absolute'}); 
          }
        else{
        	var count=0;
        	
			$('#'+dock_id+'_'+fenetre+' > div.'+objet_flotable).each(function(){   
				var id=$(this).attr('id').split('_');   
		    	var id_article=id[1];
		    	var selector='#'+objet_id+'_'+id_article;
		    	count=count+1;
		    if ($.cookie(selector)) {
          			var coords = $.cookie(selector).split(',');
          		} 
	        else {
					var coords = [count*20+'px',0]; // default top and left
				}
				$(selector).css({top:coords[0],left:coords[1],position:'absolute'}); 
			});
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
   		dockHide(fenetre);
   		});
   		$('#link_'+id_article+' span.open').replaceWith('<span class="close">+</span>');
   		$('#link_'+id_article).removeClass("open").addClass("closed");    		
	};      
    
//Cacher le dock si pas de contenu
function dockHide(fenetre){
	var d='#'+dock_id+'_'+fenetre;
	if($(d+' > div.'+objet_flotable+':visible').length == 0 ) {$(d).hide('fast'); }

};


   
 function chargerFenetre(id_article,id_article_base,statut,panier,faq,fenetre,statut_fenetre) {	  
	if(statut=='closed'){
		//Faire apparare le doc
		$('#'+dock_id+'_'+fenetre).show('fast');  	
		if(statut_fenetre=='actif'){
			$('#'+objet_id+'_'+id_article).show(300);
			 $('#link_'+id_article+' span.close').replaceWith('<span class="open">-</span>');
	         $('#link_'+id_article).removeClass("closed").addClass("open");
	         fenetreUp($('#'+objet_id+'_'+id_article));
	         
		}
		else{ 
			//préparer le cadre html
	        $('#fenetre_'+fenetre).append(
	        '<div class="floating_box" id="'+objet_id+'_'+id_article+'" data-fenetre="'+fenetre+'"style="display:none;"><div class="panneau"><div class="action_close" id="close_'+id_article+'">X</div></div><div class="floating_content"> </div></div>');
	        //charger le contenu
	        $('#'+objet_id+'_'+id_article+' .floating_content').load(
	            '/spip.php?action=charger_squelette&squelette=content/article-packs&id_article='+id_article+'&forum=non&id_article_base='+id_article_base+'&panier='+panier+'&faq='+faq,'',function(){
	            	//le rendre draggable
	            	fenetreControle('on','#'+objet_id+'_'+id_article,'','',fenetre);
	            	//mettre la fenêtre en avant
	            	fenetreUp($('#'+objet_id+'_'+id_article));
	            	//mettre la fenêtre en avant faire apparaite la fenêtre et daer le html  
	                $('#'+objet_id+'_'+id_article).show(800);
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
				   	$('dl.faq > dt').addClass("close").click(function(){
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
        	