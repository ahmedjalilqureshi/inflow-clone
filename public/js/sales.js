
let clients, items, styles, lpos, USD, GBP, AED, EURO;
     function fill() {
        let select_client = document.getElementById('pur-company-name');
        document.getElementById('pur-po').value = Math.floor(Math.random() * 100000);

        let select_item = document.getElementById('pro1category');
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let str = '<option value="">Select Customer</option>';
                clients = JSON.parse(this.responseText).clients;
                clients.forEach(client => {
                    str += `<option value='` + client.company_name + `'>` + client.company_name +
                        `</option>`
                });
                select_client.innerHTML = str;
                document.getElementById('client_data_list').innerHTML = str;

                //  console.log(clients);
            }
        };
        xhttp.open("GET", "/get_clients", true);
        xhttp.send();
        var xhttp2 = new XMLHttpRequest();
        xhttp2.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let str = '<option value="">Select Product</option>';
                items = JSON.parse(this.responseText).items;
                items.forEach(item => {
                    str += `<option value='` + item.name + `'>` + item.name + `</option>`
                });
                select_item.innerHTML = str;
                // console.log(items);
            }
        };
        xhttp2.open("GET", "/get_items", true);
        xhttp2.send();

        var xhttp3 = new XMLHttpRequest();
        xhttp3.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("sales_terms").innerHTML = JSON.parse(this.responseText).info[0].sales_terms
                USD = JSON.parse(this.responseText).info[0].USD;
                GBP = JSON.parse(this.responseText).info[0].GBP;
                EURO = JSON.parse(this.responseText).info[0].EURO;
                AED = JSON.parse(this.responseText).info[0].AED;
            }
        };
        xhttp3.open("GET", "/get_info", true);
        xhttp3.send();
        // LPOS
        var xhttp4 = new XMLHttpRequest();
        xhttp4.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                lpos = JSON.parse(this.responseText).lpos;
                populate_lpos();
                console.log("lpos", lpos);
            }
        };
        xhttp4.open("GET", "/get_lpos", true);
        xhttp4.send();


    }
   
    function grand_total(){
        let tr =  document.getElementById('items_table').getElementsByTagName('tr');
       let i , len = tr.length , total = 0;
       for(i = 0 ; i < len ; i++)
       {    let qty = parseInt(tr[i].getElementsByTagName('td')[2].getElementsByTagName('input')[0].value)
           let val = parseFloat(tr[i].getElementsByTagName('td')[3].getElementsByTagName('input')[0].value);
            if(!isNaN(val) && !isNaN(qty))
            {
                total += Math.round( val*qty );
            }
       }
       let d_dec = total -  parseInt(document.getElementById('discount').value);
       let inc =  (parseInt(document.getElementById('tax').value) * d_dec) / 100;
       let g_total  = inc + d_dec;
       document.getElementById('gross_total').innerHTML = total;
       document.getElementById('deduction').innerHTML = d_dec;
       document.getElementById('inclusive').innerHTML = inc;

       document.getElementById('grand_total').innerHTML = g_total;
       
    }
    function total_qty(){
       let tr =  document.getElementById('items_table').getElementsByTagName('tr');
       let i , len = tr.length , total_qty = 0;
       for(i = 0 ; i < len ; i++)
       {
           let val = parseInt(tr[i].getElementsByTagName('td')[2].getElementsByTagName('input')[0].value);
            if(!isNaN(val))
            {
                total_qty += val ;
            }
       } 
       document.getElementById('total_qty').innerHTML = total_qty;
    
    }
    function calc(e) {
        total_qty();
        let price = e.parentNode.parentNode.getElementsByTagName('td')[3].getElementsByTagName('input')[0]
        // let total = e.parentNode.parentNode.getElementsByTagName('td')[4].getElementsByTagName('input')[0];
        // let final;
        // final = parseFloat(price.value) * parseFloat(e.value)
        // total.value = final.toFixed(2);
        grand_total();
    }


    function populate_lpos(){
        let str = `<ul class="list_cont p-1">`;
        let str2 = ``;
        lpos.forEach((lpo)=>{
            str += `<li class="card m-1 p-1 pointer" onClick="show('${lpo._id}')" style="font-size:12px">${lpo.ref}</li>`
            str2 += `<option value='${lpo.ref}'>${lpo.ref}</option>`
        });
        str += '</ul>'
        document.getElementById('lpo_data_list').innerHTML = str2;
        document.getElementById('lpo_list').innerHTML = str;
    }
    function activate_btn() {
        document.getElementById('lpo_btn').disabled = false;
    }

    function set_item(e) {
        // alert(e.value);
        let value = e.value;
        let detail = e.parentNode.parentNode.getElementsByTagName('td')[1].getElementsByTagName('input')[0];
        let price = e.parentNode.parentNode.getElementsByTagName('td')[3].getElementsByTagName('input')[0];

        items.forEach((item) => {
            if (item.name === value) {
                detail.value = item.detail;
                price.value = item.price;
                price.setAttribute("data-price", item.price);
            }
        })
    }

    function load_items(e) {
        let str = '<option value="">Select Product</option>';
        console.log(items);
        if (e.innerHTML.length < 10) {
            console.log("yees----------")
            items.forEach((item) => {
                str += `<option>` + item.name + `</option>`;
            });
            e.innerHTML = str;
        }



    }

    function fill_client() {
        let name = document.getElementById('pur-company-name').value;
        if (name === "") {
            document.getElementById('pur-id').value = '';
            document.getElementById('pur-name').value = '';
            document.getElementById('pur-vender-address').value = '';
            document.getElementById('pur-vender-city').value = '';
            document.getElementById('pur-vender-phone').value = '';
            document.getElementById('pur-ship-phone').value = '';
            document.getElementById('pur-ship-name').value = '';
            document.getElementById('pur-ship-address').value = '';
            document.getElementById('pur-ship-city').value = '';
            document.getElementById('pur-ship-company-name').value = '';



        } else {
            clients.forEach((client) => {
                if (name === client.company_name) {
                    document.getElementById('pur-id').value = client._id;
                    document.getElementById('pur-name').value = client.name;
                    document.getElementById('pur-ship-name').value = client.name;
                    document.getElementById('pur-vender-address').value = client.street;
                    document.getElementById('pur-ship-address').value = client.street;
                    document.getElementById('pur-vender-city').value = client.city;
                    document.getElementById('pur-ship-city').value = client.city;
                    document.getElementById('pur-vender-phone').value = client.phone;
                    document.getElementById('pur-ship-phone').value = client.phone;
                    document.getElementById('pur-ship-company-name').value = client.company_name;

                }
            })

        }

    }
    function get_table_items(){
        let items_array = [],
         table = document.getElementById('items_table');
            let tr = table.getElementsByTagName('tr');
            let item, description, quantity, price, obj;
            for (let i = 0; i < tr.length; i++) {
                item = tr[i].getElementsByTagName('td')[0].getElementsByTagName('select')[0].value;
                description = tr[i].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
                quantity = tr[i].getElementsByTagName('td')[2].getElementsByTagName('input')[0].value;
                price = tr[i].getElementsByTagName('td')[3].getElementsByTagName('input')[0].value;
                
                if( item !== "" &&  
                   !isNaN(quantity) && quantity > 0 &&
                   !isNaN(price) && price > 0 ){
                    obj = {
                    item: item,
                    description: description,
                    quantity: parseInt(quantity),
                    price: parseFloat(price).toFixed(2)
                };
                items_array.push(obj);
                   }
              

            };
            return items_array;
    }
    function get_items_total(arr){
        let total = 0 ;
        arr.forEach((a)=>{
            total +=  a.quantity * a.price;
        })
        return total;
    }
    function lpo_action(status) {
            
        let btn = document.getElementById('lpo_btn');
        btn.disabled = true;
        let pur_id = document.getElementById('pur-id').value;
        let pur_name = document.getElementById('pur-name').value;
        let pur_vendor_address = document.getElementById('pur-vender-address').value;
        let pur_vendor_city = document.getElementById('pur-vender-city').value;
        let pur_vendor_phone = document.getElementById('pur-vender-phone').value;
        let pur_company_name = document.getElementById('pur-company-name').value;
        let pur_ship_name = document.getElementById('pur-ship-name').value;
        let pur_ship_address = document.getElementById('pur-ship-address').value;
        let pur_ship_city = document.getElementById('pur-ship-city').value;
        let pur_ship_phone = document.getElementById('pur-ship-phone').value;
        let pur_ship_company_name = document.getElementById('pur-ship-company-name').value;
        let lpo_number = document.getElementById('pur-po').value;
        let date = document.getElementById('pur-date').value;
        let due_date = document.getElementById('pur-date-2').value;
        let currency = document.getElementById('currency').value;
        let ref = lpo_number;
        let tax = document.getElementById("tax").value;
        let discount = document.getElementById("discount").value;
        let items_array = get_table_items();
        let total = get_items_total(items_array);
     
        total = discount>0? total - discount : total;
            total = tax>0 ? total + (total * (tax / 100)) : total;
             
        // let ref = "lpo/" + pur_company_name + "/" + lpo_number;
        if(pur_company_name.length < 2){
            alert("please select customer");
            return;
        }
        if(status==='active'){
            if (pur_ship_name.length < 2 || pur_ship_company_name.length < 2 || date.length <2){
            alert('please fill all fields');
            return;
        }
        if(items_array.length<1 )
            {
                alert('please fill atleast one row');
                return;
            }
        }    
        
           
            // console.log("...items",items_array,total);
            // return;
            // let items_array = [],
            //     total = 0;
            // let table = document.getElementById('items_table');
            // console.log("table:" + table);
            // let tr = table.getElementsByTagName('tr');
            // let item, description, quantity, price, obj;
            // let tax = document.getElementById("tax").value;
            // let discount = document.getElementById("discount").value;
            // for (let i = 0; i < tr.length; i++) {
            //     item = tr[i].getElementsByTagName('td')[0].getElementsByTagName('select')[0].value;
            //     description = tr[i].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
            //     quantity = tr[i].getElementsByTagName('td')[2].getElementsByTagName('input')[0].value;
            //     price = tr[i].getElementsByTagName('td')[3].getElementsByTagName('input')[0].value;
                
            //     if( item !== "" &&  
            //        !isNaN(quantity) && quantity > 0 &&
            //        !isNaN(price) && price > 0 ){
            //         obj = {
            //         item: item,
            //         description: description,
            //         quantity: quantity,
            //         price: price
            //     };
            //     total += quantity * price;
            //     items_array.push(obj);
            //        }
              

            // };
           
            
            items_array = JSON.stringify(items_array);
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    alert("Sales Order is Generated");
                    btn.disabled = false;

                    var link = document.createElement("a");
                    link.download = 'sales order.xlsx';
                    link.href = '/sales_order_report';
                    link.click();
                    document.location.reload();
                }
            };
            xhttp.open("POST", "/add_lpo", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("client_id="+pur_id+"&client=" + encodeURIComponent(pur_company_name) + "&lpo_num=" + encodeURIComponent(lpo_number) + "&date=" + encodeURIComponent(date) 
            + "&due_date=" +
            encodeURIComponent(due_date) + "&ref=" + encodeURIComponent(ref) + "&items_array=" + encodeURIComponent(items_array) 
            + "&total=" + encodeURIComponent(total) + "&tax=" +
            encodeURIComponent(tax) + "&discount=" + encodeURIComponent(discount) + "&pur_name=" + encodeURIComponent(pur_name) + "&v_address=" 
            + encodeURIComponent(pur_vendor_address) +
                "&v_city=" + encodeURIComponent(pur_vendor_city) + "&v_phone=" +
                encodeURIComponent(pur_vendor_phone) + "&s_name=" + encodeURIComponent(pur_ship_name) + "&s_address=" 
                + encodeURIComponent(pur_ship_address) + "&s_city=" +
                encodeURIComponent(pur_ship_city) +
                "&s_phone=" + encodeURIComponent(pur_ship_phone) + "&pur_ship_company_name=" + encodeURIComponent(pur_ship_company_name)
                 + "&status="+status+"&currency=" +
                 encodeURIComponent(currency));



        

    }
    function lpo_refresh(){
        let lpo_num = document.getElementById('input_search_lpo').value;      
        let client = document.getElementById('input_search_client').value;
        let state = document.getElementById('input_search_order_state').value;
        let str = `<ul class="list_cont p-1">`;
            console.log(lpo_num)
        lpos.forEach((lpo)=>{
            console.log(lpo.ref,"----",lpo_num)
            if( (lpo_num ==="" || lpo.ref===lpo_num) && (state === "" || state === lpo.status) && (lpo.client === client || client==="") ){
                        str += `<li class="card m-1 p-1 pointer" onClick="show('${lpo._id}')" style="font-size:12px">${lpo.ref}</li>`

            }
            // if(state!=="" && state===lpo.status)
            // {             console.log("check")

            //     if(client !== "" && client === lpo.client)
            //     {
            //         str += `<li class="card m-1 p-1 pointer" onClick="show('${lpo._id}')" style="font-size:12px">${lpo.ref}</li>`

            //     }
            //     else{
            //         str += `<li class="card m-1 p-1 pointer" onClick="show('${lpo._id}')" style="font-size:12px">${lpo.ref}</li>`

            //     }    
            // }
            // else if(client!=="" && client === lpo.client){
            //     str += `<li class="card m-1 p-1 pointer" onClick="show('${lpo._id}')" style="font-size:12px">${lpo.ref}</li>`
            // }
            // else{
            //     str += `<li class="card m-1 p-1 pointer" onClick="show('${lpo._id}')" style="font-size:12px">${lpo.ref}</li>`
            // }
        });
        //  if(client!==""){
        //         lpos.forEach((lpo)=>{
        //             if(status!==""){
        //     if(lpo.client===client){
        //         str += `<li class="card m-1 p-1 pointer" onClick="show('${lpo._id}')" style="font-size:12px">${lpo.ref}</li>`
        //     }
        // }
        // else{
        //     if(lpo.client===client && lpo.status === status){
        //         str += `<li class="card m-1 p-1 pointer" onClick="show('${lpo._id}')" style="font-size:12px">${lpo.ref}</li>`
        //     }
        // }
        // });
        //      }
            
             
        // else if(lpo_num!==""){
        //     lpos.forEach((lpo)=>{
        //     if(lpo.ref===lpo_num){
        //         str += `<li class="card m-1 p-1 pointer" onClick="show('${lpo._id}')" style="font-size:12px">${lpo.ref}</li>`
        //     }
        // }); 
        // }
        // else{
        //     lpos.forEach((lpo)=>{
        //     if(lpo.status===status ){
        //         str += `<li class="card m-1 p-1 pointer" onClick="show('${lpo._id}')" style="font-size:12px">${lpo.ref}</li>`
        //     }
        // }); 
        // }
        
        
        
        str += '</ul>'
        document.getElementById('lpo_list').innerHTML = str;
    

    }
    function lpo_search() {
        let lpo_num = document.getElementById('input_search_lpo');
        let found = false;
        lpos.forEach((lpo) => {
            if (lpo.lpo_number === lpo_num.value || lpo.ref === lpo_num.value) {
                found = true
                show(lpo._id);
            }
        })
        if (!found) {
            swal("LPO# Does Not Exist", "", "error")
        } else {
            swal("LPO# Detail is fetched");

        }
    };

    function show(id) {
        
        lpos.forEach((lpo)=>{
            if(lpo._id === id){
            console.log("selected", lpo);
        document.getElementById('pur-date').value = lpo.date;
        document.getElementById('pur-date-2').value = lpo.due_date;
        document.getElementById('pur-po').value = lpo.lpo_number;
        document.getElementById('pur-po').setAttribute('disabled','disabled')
        document.getElementById('pur-os').value = lpo.status;
        document.getElementById('pur-company-name').value = lpo.client;
        document.getElementById('pur-company-name').setAttribute('disabled','disabled')
        fill_client();
        document.getElementById('tax').value = parseFloat(lpo.tax);
        document.getElementById('discount').value = parseFloat(lpo.discount);
        document.getElementById('currency').value = lpo.currency;
        let str = '',
            str3 = '';
        let str2 = '<option value="">Select Product</option>';
        if(JSON.parse(lpo.items_array).length<1){
            str = `<tr class="d-flex">
                                                                <td class="col-3 td-cells">
                                                                    <select class="form-control" id="pro1category" onclick="load_items(this)"
                                                                        onchange="set_item(this)">
                                                                        <option value="">Select Product</option>
                                                                    </select>
                                                                </td>
                                                                <td class="col-5 td-cells">
                                                                    <input type="text" class="form-control" id="pro1description">
                                                                </td>
                                                                <td class="col-2 td-cells">
                                                                    <input type="text" class="form-control" id="pro1quantityorder"
                                                                        onkeyup="calc(this)">
                                                                </td>
                                                                <td class="col-2 td-cells">
                                                                    <input  type="text" class="form-control" id="pro1unitprice"
                                                                        onKeyUp="grand_total()"
                                                                        onkeypress="sales_add_new(event)">
                                                                </td>
                        
                                            
                                                            </tr>`;
                                                            document.getElementById('items_table').innerHTML = str;
                                                            items.forEach((item2) => {
                
                    str2 += `<option >` + item2.name + `</option>`;})
                    document.getElementById('pro1category').innerHTML = str2;

            return;
        }
        JSON.parse(lpo.items_array).forEach((item, i) => {
            str2 = '<option value="">Select Product</option>';
            str3 = `<td class="col-5 td-cells">
                                <input type="text" class="form-control" id="pro${i+1}description">
                            </td>
                            <td class="col-2 td-cells">
                                <input type="text" class="form-control" id="pro${i+1}quantityorder">
                            </td>
                            <td class="col-2 td-cells">
                                <input type="text" class="form-control" id="pro${i+1}unitprice" onkeypress="sales_add_new(event)">
                            </td>`;
            items.forEach((item2) => {
                // console.log("item p",item,"item o",item2)

                if (item2.name === item.item) {
                    console.log("matched")
                    str2 += `<option selected="selected">` + item2.name + `</option>`;
                    str3 = `<td class="col-5 td-cells">
                                <input type="text" class="form-control" id="pro${i+1}description" value="${item.description}">
                            </td>
                            <td class="col-2 td-cells">
                                <input type="text" class="form-control" id="pro${i+1}quantityorder" value="${item.quantity}">
                            </td>
                            <td class="col-2 td-cells">
                                <input type="text" value="${item.price}" class="form-control" id="pro${i+1}unitprice" onkeypress="sales_add_new(event)">
                            </td>`;

                    // set_item2(item2.name.toString());
                } else {
                    console.log("check")
                    str2 += `<option>` + item2.name + `</option>`;

                }
            })

            str += ` <tr class="d-flex">
                            <td class="col-3 td-cells">
                                <select class="form-control" id="pro${i+1}category" onclick="load_items(this)" onchange="set_item(this)">
                                ${str2}
                                    </select>
                            </td>
                            ${str3}
                        </tr>`;
        });
        document.getElementById('items_table').innerHTML = str;
        total_qty();
        grand_total();
    }
        })
            }

    let old_currency = "PKR";

    function apply_currency(e) {
        old_currency = e.value;
    }

    function currency_effect(e) {
        factor = 1;
        factorold = 1;
        switch (old_currency) {
            case "PKR":
                factorold = 1;
                break;
            case "USD":
                factorold = USD
                break;
            case "EURO":
                factorold = EURO
                break;
            case "GBP":
                factorold = GBP
                break;
            case "AED":
                factorold = AED
                break;

        }
        switch (e.value) {
            case "PKR":
                factor = 1;
                break;
            case "USD":
                factor = USD
                break;
            case "EURO":
                factor = EURO
                break;
            case "GBP":
                factor = GBP
                break;
            case "AED":
                factor = AED
                break;
        }
        let table = document.getElementById('items_table');

        let tr = table.getElementsByTagName('tr');
        for (let i = 0; i < tr.length; i++) {

            tr[i].getElementsByTagName('td')[3].getElementsByTagName('input')[0].value = (tr[i].getElementsByTagName(
                'td')[3].getElementsByTagName('input')[0].value * factorold / factor).toFixed(2);



        };
    }
    //new functions
    function new_order(){
        if(        confirm("do you really want to reload? existing changes will be discarded!")){
            window.location.reload();

        }
    }
    function delete_order(){
            if(confirm("do you really want to delete this sales order?")){
            let ref = document.getElementById('pur-po').value;
            fetch('/delete_lpo',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({ref:ref}),

            }).then(data=>data.json())
            .then(res=>{
                if(res.success){
                    alert("Sales order is deleted");
                    window.location.reload();
                }
                console.log(res)
            })
        }
    }
    function cancel_order(){
        if(confirm("do you really want to cancel this sales order?")){
            let ref = document.getElementById('pur-po').value;
            fetch('/cancel_lpo',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({ref:ref}),

            }).then(data=>data.json())
            .then(res=>{
                if(res.success){
                    alert("Sales order is cancelled");
                    window.location.reload();
                }
                console.log(res)
            })
        }
    }
    function save_order(){
        var link = document.createElement("a");
                    link.download = 'sales order.xlsx';
                    link.href = '/sales_order_report';
                    link.click();
                    return;
        let btn= {};
        generate_lpo(btn,'draft')
    }
