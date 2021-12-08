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



    //Applying filters
    //global variables

    var sites =$('#filter-site #sites input[type="checkbox"]');
    var selectedColumns=[];
    var chekboxes=[];
    var columns = [];
    var paymentModes= $('#payment-mode input[type="checkbox"]');
    var paymentStatuses  = $('#filter-payment-status #status input[type="checkbox"]');


    //loading data from csv file

        $.ajax({
            url:'../table.csv',
            dataType:'text',
            success:function(data){
               var fromCsv =  data.split(/\r?\n|\r/);
               var tableData = '<table class="table">';

               for(var i=0;i<fromCsv.length;i++)
               {
                    var rowData = fromCsv[i].split(',');
                    tableData += '<tr>';
                    for(var j=0; j<rowData.length;j++)
                    {
                        if(i===0){
                            tableData += '<th>'+ rowData[j]+'</th>';
                           columns.push(rowData[j]); 
                        }else{
                            tableData += '<td>'+rowData[j]+'</td>';
                        }
                    }
                    tableData += '</tr>';
               }
               tableData += '</table>';
               $('#table').html(tableData);


            //display columns checkboxes
               for(let i = 0; i<columns.length;i++)
               {
                   document.getElementById('selectedCols').innerHTML+='<input type="checkbox" id="'+columns[i]+'"><label for="'+columns[i]+'">'+columns[i]+'</label><br>'
               }
               selectedColumns= $('#selectedCols input');



            //All checkboxes are checked by default
            chekboxes = $('input[type="checkbox"]');
            for(let k=0;k<chekboxes.length;k++){
                chekboxes[k].checked=true;
            }
            }
            
        })
         
        
    //date range picker
    $('#selectPeriod').dateRangePicker({
        getValue: function()
        {
            return this.innerHTML;
        },
        setValue: function(s)
        {
            this.innerHTML = s;
        }
    });

        //select-All button feature
    $('#allColumns').click(function(){
        if($(this).is(':checked')){
           for(let i=0; i<selectedColumns.length; i++){
               selectedColumns[i].checked=true;
           }
        }else{
            for(let i=0; i<selectedColumns.length; i++){
                selectedColumns[i].checked=false;
            }  
        }
    })   



    //apply filters values

    $('#applyFilters').click(function(){
        console.log();
        //indexes array of selected columns
        let selectedColumnsIndexes=[];
        for(let i=0; i<selectedColumns.length; i++){
            if(selectedColumns[i].checked){
                selectedColumnsIndexes.push(i);
            }
        }

        //array of selected payment modes
        selectedPaymentModes = [];
        for(let i=0;i<paymentModes.length;i++)
        {
            if(paymentModes[i].checked){
                selectedPaymentModes.push(paymentModes[i].id.toLowerCase());
            }
        }

        //array of selected sites
        selectedSites = [];
        for(let i=0;i<sites.length;i++)
        {
            if(sites[i].checked){
                selectedSites.push(sites[i].id);
            }
        }

        //array of selected payments status
        selectedStatus = [];
        for(let i=0;i<paymentStatuses.length;i++)
        {
            if(paymentStatuses[i].checked){
                selectedStatus.push(paymentStatuses[i].id);
            }
        }


        $.ajax({
            url:'../table.csv',
            dataType:'text',
            success:function(data){
               var fromCsv =  data.split(/\r?\n|\r/);
               var tableData = '<table class="table">';

               for(var i=0;i<fromCsv.length;i++)
               {
                   //select columns function
                   function selectCols(){
                   
                   }


                    var rowData = fromCsv[i].split(',');

                    //display chosen columns
                    if(i===0)
                    {
                        tableData += '<tr>';
                        for(var j=0; j<rowData.length;j++)
                        {
                            if(selectedColumnsIndexes.includes(j))
                            {
                                tableData += '<th>'+ rowData[j]+'</th>';
                            }
                        }
                        tableData += '</tr>';
                    }

                    
            
                //function for selecting paymentModes, cols already selected
                      function selectPaymentModes(){
                        selectedPaymentModes.forEach(element => {
                            if(i===0 || rowData.includes(element))
                            {
                                tableData += '<tr>';
                                for(var j=0; j<rowData.length;j++)
                                {
                                    if(selectedColumnsIndexes.includes(j))
                                    {
                                        tableData += '<td>'+rowData[j]+'</td>';  
                                    }
                                }
                                tableData += '</tr>';
                            }
                        });
                       }
                //function for selecting sites
                       function selectSites(){
                        selectedSites.forEach(element => {
                            if(rowData.includes(element))
                            {
                                selectPaymentModes();  
                            }
                        });
                       }

                //filter by payment status

                    selectedStatus.forEach(element => {
                        if(rowData.includes(element))
                        {
                            selectSites();
                        }
                    });
                   
                    
               }
              
               tableData += '</table>';
               $('#table').html(tableData);

            }
            
        })

    })

    //download csv file 

    $('#csv').click(function(){
        $('#table').table2csv({"quoteFields":false});
    })
})

