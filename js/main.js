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
        if($(window).width() < 720){
            $('#menu-content').css('left','-200%');
            $('.wrapper').css({'position':'relative'});
        }
        counter=0;
    });

    //populating the table 

    for(var i=0;i<50;i++){
        $('.data tbody').append('<tr><td class="identity1">12304<div id=details'+i+'><p></p></div></td><td class="identity2" id=detailsCell'+i+'>Alain</td><td >11/02/2021 16:34</td><td>OrangeMoney</td><td>5000</td><td>CDF</td><td>2000</td></tr>');
         
    }


    // positionning the second column according to the first column width

    const firstColumnWidth = $('.identity01').css('width');
    $('.identity2,.identity02').css('left',firstColumnWidth);

    // showing details related to customer code id.est customer name...
    
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

    // table pagination
    var numberOfRows = $('#table1 tbody tr').length;
    var limitPage = $('#nbRows').val();
    $('#table1 tbody tr:gt('+(limitPage-1)+')').hide();
    
    var totalPages = Math.round(numberOfRows/limitPage);
    $('.pagination').append('<li class="numPage active"><a  href="javascript:void(0)">'+ 1 +'</a></li>');
    for(var i = 2 ; i<= totalPages;i++)
    {
        $('.pagination').append('<li class="numPage"><a href="javascript:void(0)">'+ i +'</a></li>');
    }

    $('.numPage').click(function(){
        if($(this).hasClass('active')){
            return false;
        }else
        {
            $('.pagination li').removeClass('active');
            $(this).addClass('active');
            $('#table1 tbody tr').hide();
        }
        
        var currentPage = $(this).index()+1;
        var cumule = limitPage*currentPage;

        for(var j=cumule-limitPage;j<cumule;j++)
        {
            $('#table1 tbody tr:eq('+j+')').show();
        }
    });
  
    $('#next').click(function(){
        let currentPage = $('.pagination li.active').index()+1;

        if(currentPage===totalPages)
        {
            return false;
        }
        else{
            currentPage++;
            $('.pagination li.active').removeClass('active');
            $('#table1 tbody tr').hide();

            var cumule = limitPage*currentPage;
            for(var j=cumule-limitPage;j<cumule;j++)
             {
                $('#table1 tbody tr:eq('+j+')').show();
            }
            $('.pagination li:eq('+(currentPage-1)+')').addClass('active');
        }
    })

    $('#previous').click(function(){
        let currentPage = $('.pagination li.active').index()+1;

        if(currentPage===1)
        {
            return false;
        }
        else{
            currentPage--;
            $('.pagination li.active').removeClass('active');
            $('#table1 tbody tr').hide();

            var cumule = limitPage*currentPage;
            for(var j=cumule-limitPage;j<cumule;j++)
             {
                $('#table1 tbody tr:eq('+j+')').show();
            }
            $('.pagination li:eq('+(currentPage-1)+')').addClass('active');
        }
    })
    
    //end padination

    //download csv file 

    $('#csv').click(function(){
        $('#table1').table2csv({"quoteFields":false});
    })
})

