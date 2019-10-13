
// function load_fabrics(){

//     var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {

//         let fabrics = JSON.parse(this.responseText).fabrics;
//         console.log("fabrics",fabrics);

//       let table=document.getElementById('fabrics_select');
//       let str='';
//       fabrics.forEach((fabric)=>{
//        str += '<option value="'+fabric.fabric_code+"/"+fabric.name+'"> '+fabric.fabric_code +"/"+fabric.name+' </option>'
//       });
//       table.innerHTML = str;
//     }
//   };
//   xhttp.open("GET", "/get_fabrics", true);
//   xhttp.send(); 
//    }
//    function load_terms(){
//      var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {

//         let info = JSON.parse(this.responseText).info[0];
//         let sizes = info.sizes.join(";");
//         document.getElementById("size_input").value = sizes;
//          document.getElementById("sales_terms_input").value = info.sales_terms;
//          document.getElementById("purchase_terms_input").value = info.purchase_terms;
//          document.getElementById("USD").value = info.USD;
//          document.getElementById("GBP").value = info.GBP;
//          document.getElementById("AED").value = info.AED;
//          document.getElementById("EURO").value = info.EURO;


//     }
//   };
//   xhttp.open("GET", "/get_info", true);
//   xhttp.send();    
//    }
//    load_terms();
//    function load_products(){
//      var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {

//         let products = JSON.parse(this.responseText).items;
//         console.log("products",products);

//       let select=document.getElementById('product_select');
//       let str='';
//       products.forEach((product)=>{
//        str += '<option value="'+product.name+'"> '+product.name+' </option>'
//       });
//       select.innerHTML = str;
//     }
//   };
//   xhttp.open("GET", "/get_items", true);
//   xhttp.send();
//    };
//    load_products();
//  load_fabrics();

var scaff = () => {
    document.querySelectorAll('input').forEach((e) => {
        e.setAttribute("autocomplete", "off");
    })
}
document.addEventListener('load', scaff());
let items_list = [];
function add(e){
    let item = document.getElementById("product_select").value,
     fabric_code = document.getElementById("fabrics_select"),
     details =  document.getElementById("p_d"), 
     logo =  document.getElementById("p_l"), 
     input = document.getElementById("product_list2");
     if(item==="" || fabric_code.value === "" || details.value === "" || logo.value=== "")
     {
         swal("Please fill all fileds");
         return;
     }
     items_list.push({product:item,fabric_code:fabric_code.value,
        details:details.value,logo:logo.value})
     show_products();
     return;
     if(input.value===""){
         let arr_obj = [{product:item,fabric_code:fabric_code.value,
             details:details.value,logo:logo.value}];

         input.value = JSON.stringify(arr_obj);
         show_products(arr_obj);
     }
      else{
          let old_arr = JSON.parse(input.value);
           old_arr.push({product:item,fabric_code:fabric_code.value,
             details:details.value,logo:logo.value});
          input.value = JSON.stringify(old_arr);
          show_products(old_arr);
      }
      logo.value ='';
      details.value = '';

}
function show_products(){
let table = document.getElementById("pro_list");
let str=''
items_list.forEach((item,i)=>{
str += `<tr><td>`+item.product+`</td>
 <td>`+item.fabric_code+`</td>
 <td>`+item.details+`</td>
 <td>`+item.logo+`</td>
 <td><button onClick="delete_row(${i})">x</button></td>
 </tr>`
})
table.innerHTML = str;

}
function delete_row(i){
   items_list.splice(i,1);
   show_products();
}

function validate(e)
{
    let val = e.value;
    if(val[val.length-1]==="&")
    {   swal("")
    var newStr = val.substring(0, val.length-1);  
              e.value =newStr;
        swal("Restricted characters are not allowed")
    }
}   
let fabrics, info, sizes, products, clients;
$.get('/get_fabrics', function (data) {
    fabrics = data.fabrics;

    let table = document.getElementById('fabrics_select');
    let str = '';
    fabrics.forEach((fabric) => {
        str += '<option value="' + fabric.fabric_code + "/" + fabric.name + '"> ' + fabric.fabric_code + "/" + fabric.name + ' </option>'
    });
    table.innerHTML = str;
})
$.get('/get_info', function (data) {
    info = data.info[0];
    sizes = info.sizes.join(";");
    document.getElementById("size_input").value = sizes;
    document.getElementById("sales_terms_input").value = info.sales_terms;
    document.getElementById("purchase_terms_input").value = info.purchase_terms;
    document.getElementById("USD").value = info.USD;
    document.getElementById("GBP").value = info.GBP;
    document.getElementById("AED").value = info.AED;
    document.getElementById("EURO").value = info.EURO;
})
$.get('/get_items', function (data) {
    products = data.items;
    let select = document.getElementById('product_select');
    let str = '';
    products.forEach((product) => {
        str += '<option value="' + product.name + '"> ' + product.name + ' </option>'
    });
    select.innerHTML = str;
})
$.get('/get_clients', function (data) {
    let str = ``;
    clients = data.clients;
    clients.forEach((v) => {
        str += `<option value='${v.company_name}'>${v.company_name}</option>`
    });
    document.getElementById('client_list').innerHTML = str;
})


// ajax form submittion
$("#currency_form").submit(function (e) {
    e.preventDefault();
    document.getElementById('p_btn').disabled = true
    var formData = {
        USD: $('#USD').val(),
        GBP: $('#GBP').val(),
        EURO: $('#EURO').val(),
        AED: $('#AED').val(),
    }
    $.ajax({
        url: '/currency_update',
        type: 'POST',
        data: formData,
        success: function (data) {
            load_terms();
            swal("Currency Updated...")

        },
    });
});
$('#size_form').submit(function (e) {
    e.preventDefault();
    document.getElementById('size_btn').disabled = true;
    let sizes = document.getElementById('size_input').value;
    let arr = [];
    let size_arr = sizes.split(";");
    size_arr.forEach((s) => {
        let a = $.trim(s);
        if (a !== "") {
            arr.push(a);

        }
    })
    if (arr.length < 1) {
        swal("please fill atleast one size");
    }
    else {
        var formData = {
            sizes: arr,
        }
        $.ajax({
            url: '/update_sizes',
            type: 'POST',
            data: formData,
            success: function (data) {
                swal("Sizes Updated")
                document.getElementById('size_btn').disabled = false

                // load_sops();
                // clear_form();`
            },
        });
    }
})
$("#product_form").submit(function (e) {
    e.preventDefault();
    document.getElementById('p_btn').disabled = true
    var formData = {
        name: $('#p_name').val().trim(),
        detail: $('#p_detail').val().trim(),
        price: $('#p_price').val().trim(),
    }
    $.ajax({
        url: '/add_item',
        type: 'POST',
        data: formData,
        success: function (data) {
            swal("Product added, continue adding more...")
            document.getElementById('p_btn').disabled = false

            // load_sops();
            // clear_form();`
        },
    });
});
$("#raw_form").submit(function (e) {
    e.preventDefault();
    document.getElementById('r_btn').disabled = true
    var formData = {
        name: $('#r_name').val(),
        detail: $('#r_detail').val(),
        unit: $('#r_unit').val(),
        price: $('#r_price').val(),
    }
    $.ajax({
        url: '/add_raw_item',
        type: 'POST',
        data: formData,
        success: function (data) {
            swal("Raw Product added, continue adding more...")
            document.getElementById('r_btn').disabled = false;
        },
    });
});

$("#style_form").submit(function (e) {
    input = document.getElementById("product_list2");
    table = document.getElementById("pro_list");
    e.preventDefault();
    let cl = $('#client_name').val();
    console.log(items_list);
    let found = false;
    clients.forEach((c)=>{
        if(c.company_name === cl){
            found = true;
        }
    })
    if(!found){
        swal("please select valid client");
        return
    }
    if (items_list.length <1) {
        swal("please select atleast one product");
    }
    else {
        document.getElementById('s_btn').disabled = true;
        var formData = new FormData(this);
        formData.append('product',JSON.stringify(items_list));
        

        $.ajax({
            url: '/add_style',
            type: 'POST',
            data: formData,
            success: function (data) {
                swal("Style added, continue adding more...");
                document.getElementById('s_btn').disabled = true;
                input.value = "";
                table.innerHTML = ""
                // load_sops();
                //  clear_form();
            },
            cache: false,
            contentType: false,
            processData: false
        });

    }
});




