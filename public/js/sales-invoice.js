    var invoices, client, lpos;
    function populate_invoices(){
        let str = `<ul class="list_cont p-1">`;
        let str2 = '<option value="">Select Invoice</option>';
        // alert(e.innerHTML.length)
        invoices.forEach((inv)=>{
            str += `<li class="card m-1 p-1 pointer" onClick="show('${inv._id}')" style="font-size:12px">${inv.ref}</li>`
            str2 += `<option value='${inv.ref}'>${inv.ref}</option>`
        });
        str += '</ul>'
        document.getElementById('invoices_ref').innerHTML = str2;
        document.getElementById('inv_list').innerHTML = str;
    }
    function populate_clients(){
        let str = '';
        let c_text = '<option value="">Select Customer</option>';
        clients.forEach(client => {
            str += `<option value='` + client.company_name + `'>` + client.company_name +
                `</option>`;
            c_text += `<option value='` + client.company_name + `'>` + client.company_name +
                `</option>`;
        });
        document.querySelector('#client_data_list').innerHTML = str;
        document.querySelector('#client_ref').innerHTML = c_text;
    }
    function populate_lpos(){
        let lpos_text = '';
        lpos.forEach((lpo) => {
           
                lpos_text += `<option value="` + lpo.ref + `">` + lpo.ref + `</option>`
            
        });
        document.querySelector('#lpo_data_list').innerHTML = lpos_text;
    }
    function set_lpos(e) {
        let lpos_select = document.getElementById("lpos_ref");
        let lpos_text = '<option value="">Select L.P.O#</option>'
        // alert(e.value);
        lpos.forEach((lpo) => {
            if (lpo.client === e.value) {
                lpos_text += `<option value="` + lpo.ref + `">` + lpo.ref + `</option>`
            }
        });
        document.querySelector('#lpo_data_list').innerHTML = lpos_text;
        lpos_select.innerHTML = lpos_text;
    }
    function show(id){
        let str = ``,total_qty=0,total_price=0;
        invoices.forEach((i) => {
            if (i._id === id) {
                lpos.forEach((l) => {
                    if (l.ref === i.lpo_ref) {
                        console.log("found2", l);
                        items_array = JSON.parse(l.items_array);
                        items_list = JSON.parse(i.items_list);
                        items_list.forEach((p_item) => {
                            items_array.forEach((c) => {
                                if (p_item.item === c.item) {
                                    p_item.price = c.price;
                                }
                            })
                            i.items_list = JSON.stringify(items_list);
                        })
                    }
                })
                console.log('i--', i)
                JSON.parse(i.items_list).forEach((v) => {
                    str += `<tr class='d-flex'>
                    <th class='col-2'>${v.item}</th>
                    <th class='col-1'>${v.ctn}</th>
                    <th class='col-2'>${v.pcs}</th>
                    <th class='col-1'>${v.size}</th>
                    <th class='col-2'>${v.qty}</th>
                    <th class='col-2'><input readonly value='${v.price}' onKeyUp='set_total(this,${v.qty})'></th>
                    <th class='col-2'><input readonly value='${v.price * v.qty}'></th>
                    </tr>`
                    total_price += (v.price * v.qty);
                    total_qty += parseInt(v.qty);
                })

            }
        })
        str += `<tr class='d-flex'>
        <th class='col-5'></th>
        <th class='col-1'>Total Items</th>
        <th class='col-2'>${total_qty}</th>
        <th class='col-2'>Grand Total</th>
        <th class='col-2'>${total_price}</th>
        </tr>` ;

        document.getElementById('items_table').innerHTML = str;
        if (e.value !== "") {
            document.getElementById('btn').disabled = false
        }
        else {
            document.getElementById('btn').disabled = true
        }
    }
    function set_invoices(e) {
        let invoices_select = document.getElementById("invoices_ref");
        let invoices_text = '<option value="">Select L.P.O#</option>'
        // alert(e.value);
        invoices.forEach((i) => {
            if (i.lpo_ref === e.value) {
                invoices_text += `<option value="` + i.ref + `">` + i.ref + `</option>`;
            }
        });
        invoices_select.innerHTML = invoices_text;
    }
    function generate_sales_invoice(e) {
        let invoice_ref = document.getElementById('invoices_ref').value,
            sm = document.getElementById('sm').value,
            o = document.getElementById('o').value,
            ft = document.getElementById('ft').value,
            pod = document.getElementById('pod').value,
            plod = document.getElementById('plod').value,
            pol = document.getElementById('pol').value;
        let tr = document.getElementById("items_table").getElementsByTagName('tr');
        let arr = [];
        for (let i = 0; i < tr.length - 1; i++) {
            let item = tr[i].getElementsByTagName('th')[0].innerHTML;
            let price = parseInt(tr[i].getElementsByTagName('th')[5].getElementsByTagName('input')[0].value);
            if (isNaN(price) || price <= 0) {
                alert("Please select valid prices!");
                return;
            }
            arr.push({ item, price });
        }
        if (sm === "" || o === "" || ft === "" || pod === "" || plod === "" || pol === "") {
            alert("please fill all fields");
        }
        else {
            e.disabled = true;
            console.log("starting");
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    alert("Sales Invoice is Generated");
                    e.disabled = false;

                    var link = document.createElement("a");
                    link.download = 'sales_invoice.xlsx';
                    link.href = '/sales_invoice_report';
                    link.click();
                    document.location.reload();
                }
            }
            xhttp.open("POST", "/generate_sales_invoice", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("ref=" + invoice_ref + "&sm=" + sm + "&o=" + o +
                "&ft=" + ft + "&pod=" + pod + "&plod=" + plod + "&pol=" + pol + "&arr=" + JSON.stringify(arr));

        }

    }
    function set_total(e, qty) {
        let th = e.parentNode.parentNode.getElementsByTagName('th')[6];
        th.getElementsByTagName('input')[0].value = e.value * qty;
    }
    function set_invoice(e) {
        let str = ``,total_qty=0,total_price=0;
        invoices.forEach((i) => {
            if (i.ref === e.value) {
                lpos.forEach((l) => {
                    if (l.ref === i.lpo_ref) {
                        console.log("found2", l);
                        items_array = JSON.parse(l.items_array);
                        items_list = JSON.parse(i.items_list);
                        items_list.forEach((p_item) => {
                            items_array.forEach((c) => {
                                if (p_item.item === c.item) {
                                    p_item.price = c.price;
                                }
                            })
                            i.items_list = JSON.stringify(items_list);
                        })
                    }
                })
                console.log('i--', i)
                JSON.parse(i.items_list).forEach((v) => {
                    str += `<tr class='d-flex'>
                    <th class='col-2'>${v.item}</th>
                    <th class='col-1'>${v.ctn}</th>
                    <th class='col-2'>${v.pcs}</th>
                    <th class='col-1'>${v.size}</th>
                    <th class='col-2'>${v.qty}</th>
                    <th class='col-2'><input readonly value='${v.price}' onKeyUp='set_total(this,${v.qty})'></th>
                    <th class='col-2'><input readonly value='${v.price * v.qty}'></th>
                    </tr>`
                    total_price += (v.price * v.qty);
                    total_qty += parseInt(v.qty);
                })

            }
        })
        str += `<tr class='d-flex'>
        <th class='col-5'></th>
        <th class='col-1'>Total Items</th>
        <th class='col-2'>${total_qty}</th>
        <th class='col-2'>Grand Total</th>
        <th class='col-2'>${total_price}</th>
        </tr>` ;

        document.getElementById('items_table').innerHTML = str;
        if (e.value !== "") {
            document.getElementById('btn').disabled = false
        }
        else {
            document.getElementById('btn').disabled = true
        }
    }
    function fill() {

        /// clients get
        var xhttp6 = new XMLHttpRequest();
        xhttp6.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                clients = JSON.parse(this.responseText).clients;
                populate_clients();
                console.log("clients:", clients);

            }
        };
        xhttp6.open("GET", "/get_clients", true);
        xhttp6.send();

        /// clients get

        //// lpos get
        var xhttp2 = new XMLHttpRequest();
        xhttp2.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                lpos = JSON.parse(this.responseText).lpos;
                populate_lpos();
                console.log("SS-lpos", lpos)

                var xhttp3 = new XMLHttpRequest();
                xhttp3.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        invoices = JSON.parse(this.responseText).invoices;
                        populate_invoices();
                       

                        console.log("invoices", invoices)
                    }
                };
                xhttp3.open("GET", "/get_invoices", true);
                xhttp3.send();

            }
        };
        xhttp2.open("GET", "/get_lpos", true);
        xhttp2.send();



    }
    fill();

    function set_lpos(e) {
        let lpos_select = document.getElementById("lpos_ref");
        let lpos_text = '<option value="">Select L.P.O#</option>'
        // alert(e.value);
        lpos.forEach((lpo) => {
            if (lpo.client === e.value) {
                lpos_text += `<option value="` + lpo.ref + `">` + lpo.ref + `</option>`
            }
        });
        lpos_select.innerHTML = lpos_text;
    }
    function inv_refresh(){
        let lpo_num = document.getElementById('input_search_lpo').value;      
        let client = document.getElementById('input_search_client').value;
        // let state = document.getElementById('input_search_order_state').value;
        let str = `<ul class="list_cont p-1">`;
            console.log(lpo_num)
        invoices.forEach((inv)=>{
            console.log(inv.lpo_ref,"----",lpo_num)
            if( (lpo_num ==="" || inv.lpo_ref=== lpo_num)  && (inv.company === client || client==="") ){
                        str += `<li class="card m-1 p-1 pointer" onClick="show('${inv._id}')" style="font-size:12px">${inv.ref}</li>`

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
        document.getElementById('inv_list').innerHTML = str;
    

    }

