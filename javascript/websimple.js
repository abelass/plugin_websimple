
$(document).ready(function(){
	var count=0;
	//bouger le panier
	  // does cookie exist?
	  if ($.cookie('coords')) {
		var coords = $.cookie('coords').split(',');
	  } else {
	        var coords = [50,50]; // default top and left
	  }
	  $('#mon_panier').css({top:coords[0],left:coords[1]});

    $(function() {
        $( "#mon_panier" ).draggable(
            {
            containment:'html', 
            cursor: 'move',    
            stop: function() {
                    $.cookie('coords',$('#mon_panier').css('top')+','+$('#mon_panier').css('left'), { expires: 365 , path: '/' });
                  }
             }
        );
      });
	
	//les objets bougables
     $("dd.introduction" ).each(function(){          
        var id=$(this).attr('id').split('_');   
        var id_article=id[1];
		count=count+1;

          // does cookie exist?
          if ($.cookie('article_'+id_article)) {
                var coords = $.cookie('article_'+id_article).split(',');
          } else {
                var coords = [0,count+'%',1,count]; // default top and left
          }
          $('#article_'+id_article).css({top:coords[0],left:coords[1],position:'absolute'});

    $(function() {
        $("#article_"+id_article).draggable(
            {
            containment:'html', 
            opacity: 0.35, 
            cursor: 'move',    
            stop: function() {
                    $.cookie('article_'+id_article,$('#article_'+id_article).css('top')+','+$('#article_'+id_article).css('left'), { expires: 365 , path: '/' });
                  }
             }
        );
      });
      });
      
$(".options").on("chargerFenetre", function(e,id_article,id_article_base,statut,panier,faq){
	e.stopPropagation();
	if(statut=='closed'){
		e.stopPropagation();
        $('#article_'+id_article+' div.load').replaceWith(
        '<div class="floating_box" id="floating_box_'+id_article+'" style="display:none;"><div class="action_close" id="close_'+id_article+'">X</div><div class="floating_content"> </div></div>');
        $('#floating_box_'+id_article+' .floating_content').load(
            '/spip.php?action=charger_squelette&squelette=content/article-packs&id_article='+id_article+'&forum=non&id_article_base='+id_article_base+'&panier='+panier+'&faq='+faq,'',function(){
                $('#floating_box_'+id_article).show(800);
                $('#link_'+id_article+'_'+id_article_base+' span.close').replaceWith('<span class="open">-</span>');
                $('#link_'+id_article+'_'+id_article_base).removeClass("closed").addClass("open");
               
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

//Ouvre la fenêtre

      
$("dt").on("click","a.closed",function (e) {
	e.stopPropagation();
	var id=$(this).attr('id').split('_');   
    var id_article=id[1];
    var id_article_base=id[2];
    var statut=$(this).attr('class');
    var panier=$(this).attr('data-panier');   
    var faq=$(this).attr('data-faq');  
   $(".options").trigger("chargerFenetre",[id_article,id_article_base,statut,panier,faq]);  
   
   return false;
   
   $("p").on("click", {foo: "bar"}, myHandler)
});
      
});

//Ouvrir et fermer un objet bougeable








