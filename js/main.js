$(function(){

    //showing filters when clicking to the toggle nav button

    let counter = 0;
    $('.mobile-nav-toggle').click(() => {
            counter++;

        $('#menu-content').css('left','0%').toggle(200);
        $('.wrapper').css({'position':'fixed','top':'0px','width':'100%'});

        if(counter==2)
        {
            $('.wrapper').css({'position':'relative'});
            counter=0;
        }
    });

    //submit filters
    $('#menu-content button[type="submit"]').click(function(){
        $('#menu-content').css('left','-200%').hide(200);
        $('.wrapper').css({'position':'relative'});
        counter=0;
    });

    //populating the table 

    for(var i=0;i<50;i++){
        $('.data tbody').append('<tr><td class="identity1">2304  <span title="more" id='+i+'>+</span><div id=details'+i+'><p></p></div></td><td class="identity2" id=detailsCell'+i+'>Alain</td><td >11/02/2021 16:34</td><td>OrangeMoney</td><td>5000</td><td>CDF</td><td>2000</td></tr>');
         
    }


    //positionning the second column according to the first column width

    const firstColumnWidth = $('.identity01').css('width');
    $('.identity2,.identity02').css('left',firstColumnWidth);

    //showing details related to customer code id.est customer name...
    
    $('td span').on({
        mouseover:function()
        {
            $('#details'+this.id+' p').text($('#detailsCell'+this.id).text());
            $('#details'+this.id).css({'padding':'0.5px','margin':'1px','background-color':'grey'});
            $('#details'+this.id).show();
            
        },

        mouseleave:function()
        {
            $('#details'+this.id).hide();
        }
    })

    //Managing login forms
    $('#agent').click(function(){
       $('.modal-content').show(); 
    })

})


