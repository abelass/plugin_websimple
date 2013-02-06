
$(document).ready(function(){
	var count=0;

	//Mettre en pace les controles
	$("section.page").on("chargerPanel", function(){
		$(this).prepend('<aside class="control_box"><div class="move"></div></aside>');
	});
	$("section.page").trigger("chargerPanel"); 	
	
	//le statut par défaut
	 if ($.cookie('move')) {
	 	var statut=$.cookie('move');
	 	}
	 else{
	 	var statut='on';
	 	}
	 	
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

	$(".options").on("chargerFenetre", function(e,id_article,id_article_base,statut,panier,faq){
		e.stopPropagation();
		if(statut=='closed'){
			e.stopPropagation();
			//préparer le cadre html
	        $('#article_'+id_article+' div.load').replaceWith(
	        '<div class="floating_box" id="floating_box_'+id_article+'" style="display:none;"><div class="panneau"><div class="action_close" id="close_'+id_article+'">X</div></div><div class="floating_content"> </div></div>');
	        //charger le contenu
	        $('#floating_box_'+id_article+' .floating_content').load(
	            '/spip.php?action=charger_squelette&squelette=content/article-packs&id_article='+id_article+'&forum=non&id_article_base='+id_article_base+'&panier='+panier+'&faq='+faq,'',function(){
	            	//mettre la fenêtre en avant
	            	fenetreUp($('#article_'+id_article));
	            	//mettre la fenêtre en avant faire apparaite la fenêtre et daer le html  
	                $('#floating_box_'+id_article).show(800);
	                $('#link_'+id_article+'_'+id_article_base+' span.close').replaceWith('<span class="open">-</span>');
	                $('#link_'+id_article+'_'+id_article_base).removeClass("closed").addClass("open");
					//rendre a fenêre resizable
				    $( ".floating_box" ).resizable({ animateEasing: "easeOutBounce" });
		
	               // Fermer une fenetre via le x
			        $('.action_close').click(function(){
			        	$('.options').off("click", ".options","chargerFenetre");
			        	e.stopPropagation();
				            var id=$(this).attr('id').split('_');   
				            var id_article=id[1];
				           $('#floating_box_'+id_article).hide(800);
				           $('#link_'+id_article+'_'+id_article_base+' span.open').replaceWith('<span class="close">+</span>');       
				           $('#link_'+id_article+'_'+id_article_base).removeClass("open").addClass("closed");
				        });
				        
	               // mettre la fenêtre active en avant
			        $('.ui-draggable').click(function(){
			        	fenetreUp($(this)); 
				        });
				      //acordeon  				        
				   	$('dl.faq > dt').addClass("close").click(function(){
				   		e.stopPropagation();
						$(this).toggleClass("close").next().toggle('fast');
						return false;
						}).next().hide();    
	             	}
	             );
	        }
	     else{      
		       	$('#floating_box_'+id_article).hide(800);
		       	$('#link_'+id_article+'_'+id_article_base+' span.open').replaceWith('<span class="close">+</span>');       
		       	$('#link_'+id_article+'_'+id_article_base).removeClass("open").addClass("closed");
	        }
	});

	//Ouvrir et fermer la fenêtre
	      
	$("dt").on("click","a",function (e) {
		e.stopPropagation();
		var id=$(this).attr('id').split('_');   
	    var id_article=id[1];
	    var id_article_base=id[2];
	    var statut=$(this).attr('class');
	    var panier=$(this).attr('data-panier');   
	    var faq=$(this).attr('data-faq');  
	   $(".options").trigger("chargerFenetre",[id_article,id_article_base,statut,panier,faq]);  
	   
	   return false;
	});
//Enlever l'effet move	
 function moveOff() {
	var count=0;
	$("dd.introduction").each(function(){   
		var id=$(this).attr('id').split('_');   
    	var id_article=id[1];
    	count=count+1;
		fenetreControle('off','#article_'+id_article,count);
		});
		fenetreControle('off','#mon_panier');			
	 $('aside.control_box .move').removeClass('off').addClass('on');
	 $.cookie('move','off', { expires: 365 , path: '/' });
	};
//Activer l'effet move		     	
 function moveOn() {
 	var count=0;
	 $("dd.introduction").each(function(){   
	 	var id=$(this).attr('id').split('_');   
   		var id_article=id[1];
   		count=count+1;
	 	fenetreControle('on','#article_'+id_article,count);
	 });
	 fenetreControle('on','#mon_panier');		
	 $('aside.control_box .move').removeClass('on').addClass('off');
	 $.cookie('move','on', { expires: 365 , path: '/' });
	 }; 	
// contrôle des fenêtres	
 function fenetreControle(statut,selector,count) {
 	if(statut=='off'){
		 $(selector).draggable( "disable" );
		 $(selector).css({top:count*2+'%',left:0,opacity:1,position:'absolute'}); 		
 	}
 	else{
		 $(function() {
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
		      });
		$(selector).draggable( "enable" );
		if ($.cookie(selector)) {
          var coords = $.cookie(selector).split(',');
          } 
        else {
         var coords = [count*2+'%',0]; // default top and left
          }
          $(selector).css({top:coords[0],left:coords[1],position:'absolute'}); 		
 	}

    }; 

 function fenetreUp(elem) {
	$('dl dd').css({'z-index':1000})
	elem.css({'z-index':10001});
    };     
});