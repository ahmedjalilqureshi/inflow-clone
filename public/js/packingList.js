
    let clients, lpos,invoices,d=document;
    function refresh_invoices(){
        let str = `<ul class="list_cont p-1">`;
        invoices.forEach((inv)=>{
            str += `<li class="card m-1 p-1 pointer" onClick="show('${inv._id}')" style="font-size:12px">${inv.ref}</li>`
        })
        document.getElementById('pl_list').innerHTML = str;
 
    }
    function show(id){
        invoices.forEach((inv)=>{
            if(inv._id === id){
                console.log(inv);
                d.querySelector('#lpo_cus').value = inv.company;
                d.querySelector('#lpo_ref').value = inv.lpo_ref;
                d.querySelector('#invoice_ref').value = inv.ref;
                d.querySelector('#lpo_cus').disabled = true;
                d.querySelector('#lpo_ref').disabled = true;
                d.querySelector('#invoice_ref').disabled = true;
                d.querySelector('#date').value = inv.date;
                clients.forEach((c)=>{
                    if(c._id===inv.company_id)
                    {
                         d.querySelector('#buyer-organization-name').innerHTML = c.company_name;
                         d.querySelector('#buyer-address').innerHTML = c.street + "," + c.city;
                         d.querySelector('#buyer-number').innerHTML = c.phone
                    }
                });
                fetch('/get_job_slips?lpo='+inv.lpo_ref).then(res=>res.json()).then(data=>{
                    let job_lists = data.job_slips;
                    let str = '';
                    job_lists.forEach((js) => {
                        // if ((parseInt(js.packing) - parseInt(js.delivered)) > 0) {
                          let found = false,item = {};
                          JSON.parse(inv.items_list).forEach((i)=>{
                                if(i.js_num===js.number){
                                    found = true;
                                    item = i;
                                }
                               
                            })
                            if(found){
                                str += `
                                <tr id="` + item.js_num + `">
                                        <td>` + js.person + `</td>
                                    <td>` + item.item + `</td>
                                    <td>` + item.size + `</td>
                                    <td>` + (parseInt(js
                                        .packing) - parseInt(js.delivered)+parseInt(item
                                            .qty)) + `</td>
                                    <td class="td-cells">
                                        <input type='text' class='form-control' value='` + (parseInt(item
                                    .qty)) + `' onChange='check_for_max(this)'  ></td>
                                    <td class="td-cells">
                                        <input type='text' class='form-control' value="`+item.ctn+`" >
                                    </td>
                                    <td class="td-cells">
                                        <input type='text' class='form-control' value="`+item.pcs+`" >
                                    </td>
                                    <td class="td-cells"><input type='hidden' value="" />
                                    <button class="btn btn-primary" onClick="add_in_list(this)">Add in List</button></td>
                                </tr>`;
                                found =false;
                            }else{
                                str += `
                            <tr id="` + js.number + `">
                                    <td>` + js.person + `</td>
                                <td>` + js.product + `</td>
                                <td>` + js.size + `</td>
                                <td>` + (parseInt(js
                                    .packing) - parseInt(js.delivered)) + `</td>
                                <td class="td-cells">
                                    <input type='text' class='form-control' value='' onChange='check_for_max(this)'  ></td>
                                <td class="td-cells">
                                    <input type='text' class='form-control' >
                                </td>
                                <td class="td-cells">
                                    <input type='text' class='form-control' >
                                </td>
                                <td class="td-cells"><input type='hidden' value="" />
                                <button class="btn btn-primary" onClick="add_in_list(this)">Add in List</button></td>
                            </tr>`;
                            }
                            
                       // }
    
                    });
                    d.querySelector("#container").innerHTML = str;
                    d.querySelector('#plu_btn').style.display="inline-block"
                    d.querySelector('#pl_btn').style.display="none"
                    JSON.parse(inv.items_list).forEach((i)=>{
                        str += `
                            <tr id="` + i.js_num + `">
                                    <td>` + i.person + `</td>
                                <td>` + i.item + `</td>
                                <td>` + i.size + `</td>
                                <td>
                                    <input type='text' class='form-control' value='` + (parseInt(i
                                .qty)) + `' onChange='check_for_max(this)' max='` + (parseInt(i.qty)) + `' ></td>
                                <td>
                                    <input type='text' class='form-control' value="`+i.ctn+`" >
                                </td>
                                <td>
                                    <input type='text' class='form-control' value="`+i.pcs+`" >
                                </td>
                                <td class="td-cells"><input type='hidden' value="" />
                                <button onClick="add_in_list(this)">Add in List</button></td>
                            </tr>`;
                    })
                    // d.querySelector("#container").innerHTML = str;
                    // d.querySelector('#plu_btn').style.display="inline-block"
                    // d.querySelector('#pl_btn').style.display="none"
                })

                
            }
        })
    }
    function fill() {
        //invoices get
        fetch("/get_invoices").then(res=>res.json()).then((data)=>{
            invoices = data.invoices;
            refresh_invoices();
        })
        //invoices get end

        //// lpos get 
        var xhttp3 = new XMLHttpRequest();
        xhttp3.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                lpos = JSON.parse(this.responseText).lpos;
                str = '<option value="">Select L.P.O</option>';
                // alert(e.innerHTML.length)
                lpos.forEach((lpo) => {
                    str += `<option value="` + lpo.ref + `">` + lpo.ref + `</option>`;
                });
                document.getElementById('lpo_ref').innerHTML = str;
                document.getElementById('lpo_data_list').innerHTML = str;

                console.log(lpos)
            }
        };
        xhttp3.open("GET", "/get_lpos", true);
        xhttp3.send();

        var xhttp6 = new XMLHttpRequest();
        xhttp6.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                clients = JSON.parse(this.responseText).clients;
                let c_text = '<option value="">Select Customer</option>';
                // alert(e.innerHTML.length)
                clients.forEach((client) => {
                    c_text += `<option value='` + client.company_name + `'>` + client.company_name +
                        `</option>`;
                });
                document.getElementById('lpo_cus').innerHTML = c_text;
                document.getElementById('client_data_list').innerHTML = c_text;

                console.log("clients:", clients);

            }
        };
        xhttp6.open("GET", "/get_clients", true);
        xhttp6.send();


        var xhttp4 = new XMLHttpRequest();
        xhttp4.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let d = new Date();
                document.getElementById("invoice_ref").value = d.getFullYear() + "/" + JSON.parse(this.responseText)
                    .info[0].invoice_num;

                console.log(this.responseText)
            }
        };
        xhttp4.open("GET", "/get_info", true);
        xhttp4.send();

    }

    function fill_cust(e) {
        let lpos_select = document.getElementById("lpo_ref");
        let lpos_text = '<option value="">Select L.P.O#</option>'
        // alert(e.value);
        lpos.forEach((lpo) => {
            if (lpo.client === e.value) {
                lpos_text += `<option value="` + lpo.ref + `">` + lpo.ref + `</option>`
            }
        });
        lpos_select.innerHTML = lpos_text;
    }

    function fill_items(e) {

        // let lpos_select = document.getElementById("lpos_select");
        // let lpos_text = '<option value="">Select C.P.O#</option>'
        // // alert(e.value);
        // lpos.forEach((lpo) => {
        //     if (lpo.client === e.value) {
        //         lpos_text += `<option value="` + lpo.ref + `">` + lpo.ref + `</option>`
        //     }
        // });
        // lpos_select.innerHTML = lpos_text;

        let value = e.value;
        set_client(value);
        set_list(value);

    }

    // function fill_items(e) {
    //     let value = e.value;
    //     set_client(value);
    //     set_list(value);

    // }

    function set_client(val) {
        let value = val;
        if (value.length > 0) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(this.responseText);
                    client = JSON.parse(this.responseText).client;
                    document.getElementById('buyer-organization-name').innerHTML = client.company_name;
                    document.getElementById('buyer-address').innerHTML = client.street + "," + client.city;
                    document.getElementById('buyer-number').innerHTML = client.phone
                }
            };
            xhttp.open("GET", "/get_client?lpo=" + encodeURIComponent(val), true);
            xhttp.send();
        } else {
            alert("null")
            document.getElementById('buyer-organization-name').value = '';
            document.getElementById('buyer-address').value = '';
            document.getElementById('buyer-number').value = '';
        }


    }

    function check_for_max(e) {
        let tr = e.parentNode.parentNode;
        let max = parseInt(tr.getElementsByTagName('th')[3].innerHTML);
         if (e.value > max) {
             e.value = max;
         }
    }

    function set_list(val) {

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                document.getElementById("pl_btn").disabled = false;
                let str = '';
                let job_lists = JSON.parse(this.responseText).job_slips;
                job_lists.forEach((js) => {
                    if ((parseInt(js.packing) - parseInt(js.delivered)) > 0) {
                        str += `
                        <tr class="d-flex" id="` + js.number + `">
                                <th class="col-2">` + js.person + `</th>
                            <th class="col-2">` + js.product + `</th>
                            <th class="col-1">` + js.size + `</th>
                            <th class="col-1 ">`+ (parseInt(js
                                .packing) - parseInt(js.delivered))+`</th>
                            <th class="col-1 ">
                                <input type='text' class='form-control' value='' onChange='check_for_max(this)' ></th>
                            <td class="col-2 td-cells">
                                <input type='text' class='form-control' >
                            </td>
                            <td class="col-2 td-cells">
                                <input type='text' class='form-control' >
                            </td>
                            <td class="col-1"><input type='hidden' value="" />
                            <button onClick="add_in_list(this)">Add in List</button></td>
                        </tr>`;
                    }

                })
                // alert(str);
                document.getElementById("container").innerHTML = str;
                // client = JSON.parse(this.responseText).client;
                // document.getElementById('buyer-organization-name').innerHTML = client.company_name;
                // document.getElementById('buyer-address').innerHTML = client.street + "," + client.city;
                // document.getElementById('buyer-number').innerHTML = client.phone
            }
        };
        xhttp.open("GET", "/get_job_slips?lpo=" + encodeURIComponent(val), true);
        xhttp.send();

    }
    function update_packing_list(e){
        e.disabled = false;
        // let company = document.getElementById('buyer-organization-name').innerHTML;
        // let lpo_ref = document.getElementById('lpo_ref').value;
        // let lpo_id = lpos.filter((c)=>{if(c.ref===lpo_ref){return c}})[0]._id;
        let invoice_num = document.getElementById('invoice_ref').value;
        let date = document.getElementById('date').value;
        // let company_id = clients.filter((c)=>{if(c.company_name===company){return c}})[0]._id;
        let items_array = [];
        let table = document.getElementById('container');
        console.log("table:" + table);
        let tr = table.getElementsByTagName('tr');
        let item, size, qty, ctn, pcs;
        for (let i = 0; i < tr.length; i++) {
            if (tr[i].getElementsByTagName('td')[2].getElementsByTagName('input')[0].value == "added") {
                js_num = tr[i].id;
                item = tr[i].getElementsByTagName('th')[1].innerHTML;
                size = tr[i].getElementsByTagName('th')[2].innerHTML;
                qty = tr[i].getElementsByTagName('th')[4].getElementsByTagName('input')[0].value;
                ctn = tr[i].getElementsByTagName('td')[0].getElementsByTagName('input')[0].value;
                pcs = tr[i].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
                obj = {
                    js_num: js_num,
                    item: item,
                    size: size,
                    qty: qty,
                    ctn: ctn,
                    pcs: pcs
                };
                if(obj.qty==="" || obj.qty===0){
                    swal("please select valid quantity for "+item);
                    e.disabled = false;
                    return;
                }
                items_array.push(obj);
            }

        };
        if(items_array.length<1){
            swal("Please select atleast one item!");
            e.disabled = false;
            return;
        }
        if(date===""){
            swal("Please select a date");
            e.disabled = false;
            return;
        }
        console.log(items_array);
        items_array = JSON.stringify(items_array);
        // xhttp.send("lpo_ref=" + encodeURIComponent(lpo_ref) + "&invoice_num=" + invoice_num + "&date=" + date + "&packing_list=" +
        // encodeURIComponent(items_array));
        let form ={
            invoice_num:invoice_num,
            date:date,
            packing_list:items_array
        }
        console.log(form);
        fetch("/update_packing_list",
        {method:"POST",
        body:JSON.stringify(form),
        headers:{
            "Content-Type":"application/json"
        }

        }).then(res=>res.json()).then(resp=>{
            console.log(resp);
            swal("Packing List is generated");
            e.disabled = false;

            var link = document.createElement("a");
            link.download = 'packing_list.xlsx';
            link.href = '/packing_list_report';
            link.click();
            document.location.reload();
        })

    }
    function generate_packing_list(e) {
        e.disabled = true;
        let company = document.getElementById('buyer-organization-name').innerHTML;
        let lpo_ref = document.getElementById('lpo_ref').value;
        let lpo_id = lpos.filter((c)=>{if(c.ref===lpo_ref){return c}})[0]._id;
        let invoice_num = document.getElementById('invoice_ref').value;
        let date = document.getElementById('date').value;
        let company_id = clients.filter((c)=>{if(c.company_name===company){return c}})[0]._id;
        let items_array = [],
            total = 0;
        let table = document.getElementById('container');
        console.log("table:" + table);
        let tr = table.getElementsByTagName('tr');
        let item, size, qty, ctn, pcs;
        for (let i = 0; i < tr.length; i++) {
            if (tr[i].getElementsByTagName('td')[2].getElementsByTagName('input')[0].value == "added") {
                js_num = tr[i].id;
                item = tr[i].getElementsByTagName('th')[1].innerHTML;
                size = tr[i].getElementsByTagName('th')[2].innerHTML;
                qty = tr[i].getElementsByTagName('th')[4].getElementsByTagName('input')[0].value;
                ctn = tr[i].getElementsByTagName('td')[0].getElementsByTagName('input')[0].value;
                pcs = tr[i].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
                obj = {
                    js_num: js_num,
                    item: item,
                    size: size,
                    qty: qty,
                    ctn: ctn,
                    pcs: pcs
                };
                if(obj.qty==="" || obj.qty===0){
                    swal("please select valid quantity for "+item);
                    return;
                }
                items_array.push(obj);
            }

        };
        if(items_array.length<1){
            swal("Please select atleast one item!");
            return;
        }
        if(date===""){
            swal("Please select a date");
            return;
        }
        console.log(items_array);
        items_array = JSON.stringify(items_array);
        // xhttp.send("lpo_ref=" + encodeURIComponent(lpo_ref) + "&invoice_num=" + invoice_num + "&date=" + date + "&packing_list=" +
        // encodeURIComponent(items_array));
        let form ={
            lpo_ref:lpo_ref,
            lpo_id:lpo_id,
            company:company,
            company_id:company_id,
            invoice_num:invoice_num,
            date:date,
            packing_list:items_array
        }
        console.log(form);
        fetch("/generate_packing_list",
        {method:"POST",
        body:JSON.stringify(form),
        headers:{
            "Content-Type":"application/json"
        }

        }).then(res=>res.json()).then(resp=>{
            console.log(resp);
            swal("Packing List is generated");
            e.disabled = false;

            var link = document.createElement("a");
            link.download = 'packing_list.xlsx';
            link.href = '/packing_list_report';
            link.click();
            document.location.reload();
        })
        return;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert("Packing List is generated");
                e.disabled = false;

                var link = document.createElement("a");
                link.download = 'packing_list.xlsx';
                link.href = '/packing_list_report';
                link.click();
                document.location.reload();
            }
        };
        xhttp.open("POST", "/generate_packing_list", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("lpo_ref=" + encodeURIComponent(lpo_ref) + "&invoice_num=" + invoice_num + "&date=" + date + "&packing_list=" +
        encodeURIComponent(items_array));





    }

    function add_in_list(e) {
        let added = e.parentNode.getElementsByTagName("input")[0].value;
        if (added === "") {
            e.style.border = "1px solid blue";
            e.style.backgroundColor = "cyan";
            e.parentNode.getElementsByTagName("input")[0].value = "added"
        } else {
            e.style.border = "";
            e.style.backgroundColor = "";
            e.parentNode.getElementsByTagName("input")[0].value = ""
        }
    }
