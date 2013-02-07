	var count=0;
	var objet_flotable='floating_box';
	var objet_id='floating-box';
	var container_flotable=".flottable";
	var data_target="float";		
	//le statut par défaut
	 if ($.cookie('move')) {
	 	var statut=$.cookie('move');
	 	}
	 else{
	 	var statut='on';
	 	}	
	


$(document).ready(function(){

	//Mis en plus de la structure de fenêtres flottables
	$(".flottable").each(function(){   
   		count=count+1;
   		$('aside.fenetres').append('<div class="fenetre_container" id="fenetre_'+count+'" data-fenetre="'+count+'"></div>');
   		//donner l'attribut de la fenetre
   		$(this).find( 'a.closed').each(function(){ 
   			$(this).attr('data-fenetre',count);
   		});
	 });
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

	//Ouvrir et fermer la fenêtre
	      
	$('a[data-target="'+data_target+'"]').click(function() {
		var id=$(this).attr('id').split('_');   
	    var id_article=id[1];
	    var id_article_base=$(this).attr('data-base');
	    var statut=$(this).attr('class');
	    var panier=$(this).attr('data-panier');   
	    var faq=$(this).attr('data-faq'); 
	    var fenetre=$(this).attr('data-fenetre');  
	    chargerFenetre(id_article,id_article_base,statut,panier,faq,fenetre);
	   return false;
	}); 	
 });

//Enlever l'effet move	
 function moveOff() {
	var count=0;
	$('.'+objet_flotable).each(function(){   
		var id=$(this).attr('id').split('_');   
    	var id_article=id[1];
    	count=count+1;
		fenetreControle('off','#'+objet_id+'_'+id_article,count);
		});
		fenetreControle('off','#mon_panier');			
	 $('aside.control_box .move').removeClass('off').addClass('on');
	 $.cookie('move','off', { expires: 365 , path: '/' });
	};
//Activer l'effet move		     	
 function moveOn() {
 	var count=0;
	 $('.'+objet_flotable).each(function(){   
	 	var id=$(this).attr('id').split('_');   
   		var id_article=id[1];
   		count=count+1;
	 	fenetreControle('on','#'+objet_id+'_'+id_article,count);
	 });
	 fenetreControle('on','#mon_panier');		
	 $('aside.control_box .move').removeClass('on').addClass('off');
	 $.cookie('move','on', { expires: 365 , path: '/' });
	 }; 	
// contrôle des fenêtres	
 function fenetreControle(statut,selector,count) {

 	if(statut=='off'){
		 $(selector).draggable( "disable" );
		 $(selector).css({top:count*20+'px',left:0,opacity:1,position:'absolute'}); 		
 	}
 	else{
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
		$(selector).draggable( "enable" );
		if ($.cookie(selector)) {
          var coords = $.cookie(selector).split(',');
          } 
        else {
        	if(count){
        		var coords = [count*20+'px',0]; // default top and left
        	}
          }
        if(coords){
          	$(selector).css({top:coords[0],left:coords[1],position:'absolute'}); 
          }
        else{
        	var count=0;
			$('.'+objet_flotable).each(function(){   
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

 function fenetreUp(elem) {
	$('.'+objet_flotable).css({'z-index':1000})
	elem.css({'z-index':10001});
    };  
    
 function chargerFenetre(id_article,id_article_base,statut,panier,faq,fenetre) {
	if(statut=='closed'){	    
		//préparer le cadre html
        $('#fenetre_'+fenetre).append(
        '<div class="floating_box" id="'+objet_id+'_'+id_article+'" style="display:none;"><div class="panneau"><div class="action_close" id="close_'+id_article+'">X</div></div><div class="floating_content"> </div></div>');
        //charger le contenu
        $('#'+objet_id+'_'+id_article+' .floating_content').load(
            '/spip.php?action=charger_squelette&squelette=content/article-packs&id_article='+id_article+'&forum=non&id_article_base='+id_article_base+'&panier='+panier+'&faq='+faq,'',function(){
            	//le rendre draggable
            	fenetreControle('on','#'+objet_id+'_'+id_article);
            	//mettre la fenêtre en avant
            	fenetreUp($('#'+objet_id+'_'+id_article));
            	//mettre la fenêtre en avant faire apparaite la fenêtre et daer le html  
                $('#'+objet_id+'_'+id_article).show(800);
                $('#link_'+id_article+' span.close').replaceWith('<span class="open">-</span>');
                $('#link_'+id_article).removeClass("closed").addClass("open");
				//rendre a fenêre resizable
			    $( "objet_flotable" ).resizable({ animateEasing: "easeOutBounce" });
               // Fermer une fenetre via le x
		        $('.action_close').click(function(){
			            var id=$(this).attr('id').split('_');   
			            var id_article=id[1];
			           $('#'+objet_id+'_'+id_article).hide(800);
			           $('#link_'+id_article+' span.open').replaceWith('<span class="close">+</span>');       
			           $('#link_'+id_article).removeClass("open").addClass("closed");
			        });
			        
               // mettre la fenêtre active en avant
		        $('.ui-draggable').click(function(){
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
     else{      
	       	$('#'+objet_id+'_'+id_article).hide(800);
	       	$('#link_'+id_article+' span.open').replaceWith('<span class="close">+</span>');       
	       	$('#link_'+id_article).removeClass("open").addClass("closed");
        }
    };  
        	