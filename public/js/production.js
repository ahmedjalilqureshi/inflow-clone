function cutting_done(e) {
    // e.disabled = true;
    let lpo_ref = document.getElementById("s_lpo_select").value,
        q = document.getElementById("q_cut_input").value,
        by = document.getElementById("cutting_by_input").value,
        d = new Date(),
        time = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + "--" + d.getHours() + ":" + d.getMinutes();


    console.log("quantity:" + q);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let not_found = JSON.parse(this.responseText).not_found;
            if (not_found) {
                alert("selected sequence does not exist in current job slip");
                return;
            }
            let range_out = JSON.parse(this.responseText).range_out;
            let duplicate = JSON.parse(this.responseText).duplicate;
            if (range_out || duplicate) {
                if (range_out) {
                    alert("selected sequence is out of range of current job slip");
                }
                else if (range_out && duplicate) {
                    alert("selected sequence is out of range of current job slip , and some are duplications");

                }
                else {
                    alert("There are some duplications");

                }

            }
            else {
                alert("success");
            }
            //    alert(msg);

        }
    };
    xhttp.open("POST", "/job_slip/cutting", true);
    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhttp.send("lpo_ref=" + lpo_ref + "&q=" + q + "&date=" + time + "&by=" + by);
    // location.reload();


}

function stitching_done(e) {
    // e.disabled = true;
    let lpo_ref = document.getElementById("s_lpo_select").value,
        q = document.getElementById("q_stitched_input").value,
        by = document.getElementById("stitching_by_input").value,
        d = new Date(),
        time = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + "--" + d.getHours() + ":" + d.getMinutes();



    console.log("quantity:" + q);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let not_found = JSON.parse(this.responseText).not_found;
            if (not_found) {
                alert("selected sequence does not exist in current job slip");
                return;
            }

            let range_out = JSON.parse(this.responseText).range_out;
            let duplicate = JSON.parse(this.responseText).duplicate;
            let violation = JSON.parse(this.responseText).violation;

            if (range_out || duplicate || violation) {
                if (range_out) {
                    alert("selected sequence is out of range of current job slip");
                }
                else if (range_out && duplicate) {
                    alert("selected sequence is out of range of current job slip , and some are duplications");

                }
                else if (violation) {
                    alert("cutting should be done first!!!");
                }
                else {
                    alert("There are some duplications");

                }

            }
            else {
                alert("success");
            }

        }
    };
    xhttp.open("POST", "/job_slip/stitching", true);
    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhttp.send("lpo_ref=" + lpo_ref + "&q=" + q + "&date=" + time + "&by=" + by);
    // location.reload();

}

function qc_done(e) {
    // e.disabled = true;
    let lpo_ref = document.getElementById("s_lpo_select").value,
        q = document.getElementById("q_qc_input").value,
        by = document.getElementById("qc_by_input").value,
        d = new Date(),
        time = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + "--" + d.getHours() + ":" + d.getMinutes();




    console.log("quantity:" + q);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let not_found = JSON.parse(this.responseText).not_found;
            if (not_found) {
                alert("selected sequence does not exist in current job slip");
                return;
            }

            let range_out = JSON.parse(this.responseText).range_out;
            let duplicate = JSON.parse(this.responseText).duplicate;
            let violation = JSON.parse(this.responseText).violation;

            if (range_out || duplicate || violation) {
                if (range_out) {
                    alert("selected sequence is out of range of current job slip");
                }
                else if (range_out && duplicate) {
                    alert("selected sequence is out of range of current job slip , and some are duplications");

                }
                else if (violation) {
                    alert("previous steps should be done first!!!");
                }
                else {
                    alert("There are some duplications");

                }

            }
            else {
                alert("success");
            }


        }
    };
    xhttp.open("POST", "/job_slip/qc", true);
    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhttp.send("lpo_ref=" + lpo_ref + "&q=" + q + "&date=" + time + "&by=" + by);
    // location.reload();

}
function packing_done(e) {
    // e.disabled = true
    let lpo_ref = document.getElementById("s_lpo_select").value,
        q = document.getElementById("q_packed_input").value,
        by = document.getElementById("packing_by_input").value,
        d = new Date(),
        time = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + "--" + d.getHours() + ":" + d.getMinutes();

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let not_found = JSON.parse(this.responseText).not_found;
            if (not_found) {
                alert("selected sequence does not exist in current job slip");
                return;
            }

            let range_out = JSON.parse(this.responseText).range_out;
            let duplicate = JSON.parse(this.responseText).duplicate;
            let violation = JSON.parse(this.responseText).violation;

            if (range_out || duplicate || violation) {
                if (range_out) {
                    alert("selected sequence is out of range of current job slip");
                }
                else if (range_out && duplicate) {
                    alert("selected sequence is out of range of current job slip , and some are duplications");

                }
                else if (violation) {
                    alert("previous steps should be done first!!!");
                }
                else {
                    alert("There are some duplications");

                }

            }
            else {
                alert("success");
            }


        }
    };
    xhttp.open("POST", "/job_slip/packing", true);
    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhttp.send("lpo_ref=" + lpo_ref + "&q=" + q + "&date=" + time + "&by=" + by);
    //  location.reload();

}
let lpos, products, job_slips, styles, clients, sizes = ``;
function set_product_list(e) {
    let text = '',size_list = '';
    styles.forEach((style) => {
        sizes.forEach((s)=>{
            size_list += `<option value="${s}">${s}</option>`
        })
        if (style._id === e.value) {


            let product_list = JSON.parse(style.product);
            product_list.forEach((product) => {
                text += `<tr>
                        <td>`+ product.product + `</td><td>` + product.fabric_code + `</td>
                        <td>`+ product.details + `</td><td><textarea rows='4' class='form-control'></textarea></td>
                        <td><input type="number" class="form-control"></td>
                        <td style='width:150px'><select class="form-control">
                               ${size_list}

                            </select></td>
                        <td><input class="form-control"></td><td><button class="btn btn-primary" onClick="create_job_slip(this)">Create Job Slip</button></td>
                        </tr>`
            })
        }
    });
    document.getElementById("product_list").innerHTML = text;
    console.log(text);
}
function create_job_slip(e) {
    e.disabled = true;
    let lpo_id = document.getElementById("lpo_select").value;
    si = document.getElementById("style_select").value,
        ss = '',lpo_ref='';
    lpos.forEach((l)=>{
        if(l._id===lpo_id)
        {
            lpo_ref = l.ref;
        }
    })
    styles.forEach((st) => {
        if (st._id === si) {
            ss = st.title;
        }
    })

    p = e.parentNode.parentNode.getElementsByTagName("td")[0].innerHTML,
        q = e.parentNode.parentNode.getElementsByTagName("td")[4].getElementsByTagName("input")[0].value,
        s = e.parentNode.parentNode.getElementsByTagName("td")[5].getElementsByTagName("select")[0].value,
        pe = e.parentNode.parentNode.getElementsByTagName("td")[6].getElementsByTagName("input")[0].value,
        m = e.parentNode.parentNode.getElementsByTagName("td")[3].getElementsByTagName("textarea")[0].value,
        d = new Date().getTime();
    if (lpo_ref === "") {
        alert("please select LPO ref");
        e.disabled = false;

    }
    else if (p === "" || q === "" || s === "" || pe === "" || m === "") {
        alert("please fill measurements,quantity,size and person!!");
        e.disabled = false;

    }
    else {
       
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let starting_number = JSON.parse(this.responseText).starting_number;
                let quantity = JSON.parse(this.responseText).quantity;
                let product = JSON.parse(this.responseText).product;
                let person = JSON.parse(this.responseText).person;

                e.disabled = false;
                e.parentNode.parentNode.getElementsByTagName("td")[4].getElementsByTagName("input")[0].value = '';
                e.parentNode.parentNode.getElementsByTagName("td")[5].getElementsByTagName("select")[0].value = '';
                e.parentNode.parentNode.getElementsByTagName("td")[6].getElementsByTagName("input")[0].value = '';
                e.parentNode.parentNode.getElementsByTagName("td")[3].getElementsByTagName("textarea")[0].value = '';
                swal(`Job Slip is created of ${product} , series starting from ${starting_number} ,total quantity = ${quantity} , for ${person} `);

                //  alert("job slip is created for lpo ref#"+lpo_ref+" for "+q+" "+p );
                load_job_slips();
            }
        };
        xhttp.open("POST", "/create_job_slip", true);
        xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhttp.send("lpo_ref=" + lpo_ref + "&lpo_id="+lpo_id+"&ss=" + ss + "&si=" + si + "&q=" + q + "&p=" + p + "&s=" + s + "&pe=" + pe + "&m=" + m + "&d=" + d);


    }

}

function load_lpos_styles() {
    var xhttp3 = new XMLHttpRequest();
    xhttp3.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            lpos = JSON.parse(this.responseText).lpos;
            str = '<option value="">Select L.P.O</option>';
            // alert(e.innerHTML.length)
            lpos.forEach((lpo) => {
                str += `<option value="` + lpo._id + `">` + lpo.ref + `</option>`;
            });
            document.getElementById('lpo_select').innerHTML = str;

            console.log(lpos)
        }
    };
    xhttp3.open("GET", "/get_lpos", true);
    xhttp3.send();
    ////

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            styles = JSON.parse(this.responseText).styles;

        }
    };
    xhttp.open("GET", "/get_styles", true);
    xhttp.send();
    ///////////////
    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
             info = JSON.parse(this.responseText).info;
            sizes = info[0].sizes ;           
            console.log(info);
            let size_txt = `<option value="">Select Size</option>`;
            info[0].sizes.forEach((s) => {
                size_txt += `<option value="${s}">${s}</option>`;
            })
            // sizes = size_txt;
            document.getElementById('starting_number').value = (info[0].last_number) + 1;
            document.getElementById('starting_number_2').innerHTML = (info[0].last_number) + 1;

        }
    };
    xhttp2.open("GET", "/get_info", true);
    xhttp2.send();
    ////
    load_job_slips();

    //// clients list

    var xhttp6 = new XMLHttpRequest();
    xhttp6.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            clients = JSON.parse(this.responseText).clients;
            let c_text = '<option value="">Select Client</option>';
            // alert(e.innerHTML.length)
            clients.forEach((client) => {
                c_text += `<option value='` + client._id + `'>` + client.company_name + `</option>`;
            });
            document.getElementById('clients_select').innerHTML = c_text;
            document.getElementById('clients_select2').innerHTML = c_text;


        }
    };
    xhttp6.open("GET", "/get_clients", true);
    xhttp6.send();

}
function update_js(e){
    let tr = e.parentNode.parentNode;
    let id = tr.getAttribute("data-role");
    measurements = tr.getElementsByTagName("th")[2].getElementsByTagName("textarea")[0].value;
    size = tr.getElementsByTagName("th")[4].getElementsByTagName("select")[0].value;
    person = tr.getElementsByTagName("th")[5].getElementsByTagName("input")[0].value;
    swal("Are you sure,You want to Update this item?", {
        dangerMode: true,
        buttons: true,
      }).then((done) => {
        if (done) {
            $.post('/update_job_slip',{id,measurements,size,person},function(data){
                if(data.success){
                    // tr.parentNode.removeChild(tr);
                    swal("Job Slip Updated!");
                    // window.location.reload();
                }
            })

        }});    
}
function delete_js(e){
    let tr = e.parentNode.parentNode;
    let id = tr.getAttribute("data-role");
    swal("Are you sure,You want to delete this item?", {
        dangerMode: true,
        buttons: true,
      }).then((done) => {
        if (done) {
            $.post('/delete_job_slip',{id},function(data){
                if(data.success){
                    tr.parentNode.removeChild(tr);
                    swal("Job Slip Deleted!");
                    // window.location.reload();
                }
            })

        }});    
}
function show_job_slips(id){
    let str = '';
    job_slips.forEach((j)=>{
        if(j.lpo_id === id){
            str2 = '',size_list = '';

            sizes.forEach((s)=>{
                if(s.indexOf(j.size)!==-1){
                    size_list += `<option selected="selected" value="${s}">${s}</option>`
                }
                else{
                    size_list += `<option value="${s}">${s}</option>`
    
                }
            })
            console.log(size_list,j.size);
            str += `<tr data-role="${j._id}">
            <th>${j.style}</th>
            <th>${j.product}</th>
            <th><textarea> ${j.measurements}</textarea></th>
            <th>${j.quantity}</th>
            <th><select>${size_list}</select></th>
            <th><input value="${j.person}" /></th>
            <th><button onClick="update_js(this)">Update</button>
            <button onClick="delete_js(this)">Delete</button></th></tr>`
       
        }
        });
    document.querySelector('#existing_js').innerHTML = str;
}
function set_style(e) {
    // lpos.filter((l)=>{if(l.client===e){return l}});
    console.log("---------",e.value)
    let client = '',ref='';
    lpos.forEach((l) => { if (l._id === e.value) { client =l.client,ref=l.ref } }) //e.value.split("/")[1];
    console.log("cl->>>", client)
    str = '<option >Select Style</option>';
    // alert(e.innerHTML.length)
    console.log("sssss",styles);
    styles.forEach((style) => {
        if (client === style.client) {
            str += `<option value='` + style._id + `'>` + style.title + `</option>`;
        }
    });
    document.querySelector('#lpo_ref_ph').innerHTML=ref;
    document.querySelector('#lpo_ref_ph2').innerHTML=ref;
    document.querySelector('#style_select').innerHTML = str;
    show_job_slips(e.value);

}
function load_job_slips() {
    var xhttp4 = new XMLHttpRequest();
    xhttp4.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            job_slips = JSON.parse(this.responseText).job_slips;
            // str = '<option value="null">Select Job Slip #</option>';
            // job_slips.reverse().forEach((job_slip) => {
            //     str += `<option value='`+job_slip.number+`'>`+job_slip.ref+"/js#" + job_slip.style + `</option>`;
            // });
            // document.getElementById('js_select').innerHTML = str;
            // document.getElementById('js_select_1').innerHTML = str;
            console.log("job_slip", job_slips);
            let unique_lpos = [];
            job_slips.forEach((js) => {
                if (unique_lpos.indexOf(js.ref) === -1) {
                    unique_lpos.push(js.ref);
                }
            });
            let u_lpo = '<option value="">Select LPO</option>';
            unique_lpos.reverse().forEach((lpo) => {
                u_lpo += `<option value="` + lpo + `">` + lpo + `</option>`
            });
            document.getElementById("unique_lpos").innerHTML = u_lpo;
            // document.getElementById("unique_lpos2").innerHTML = u_lpo;
            console.log("unique_lpo", unique_lpos);

        }
    };
    xhttp4.open("GET", "/get_job_slips", true);
    xhttp4.send();


}
function lpo_set(e,t) {
    // let select = document.getElementById("s_lpo_select");
    let lpos_txt = '<option value="">Select L.P.O</option>';
    let company_name = e.value;
    console.log("lpos", lpos);
    lpos.forEach((lpo) => {
        if (lpo.client_id === company_name) {
            lpos_txt += `<option value="` + lpo._id + `">` + lpo.ref + `</option>`
        }
    });
    document.getElementById(t).innerHTML = lpos_txt;
}
function js_set(e) {
    jsp_set("");
    let js = document.getElementById("js_select_1");
    let js_html = '<option value="">Select Job Slip</option>';
    job_slips.forEach((js) => {
        if (js.ref === e.value) {
            js_html += `<option value="` + js.number + `">` + js.person + `-` + js.product + `-` + js.size + `</option>`
        }
    })
    js.innerHTML = js_html;
}
function js_set2(e) {
    //     jsp_set("");
    let js = document.getElementById("js_select");
    let js_html = '<option value="">Select Job Slip</option>';
    job_slips.forEach((js) => {
        if (js.ref === e.value) {
            js_html += `<option value="` + js.number + `">` + js.product + `-` + js.size + `</option>`
        }
    })
    js.innerHTML = js_html;
    //alert(e.value);
}
// function load_products() {
//     let product_select = document.getElementById('product_select');
//     let company_name = document.getElementById('company_name');
//     let lpo_select = document.getElementById('lpo_select');
//     lpos.forEach((lpo) => {
//         if (lpo.ref === lpo_select.value) {
//             products = JSON.parse(lpo.items_array);
//             let str = '<option>Select Product</option>'
//             products.forEach((product) => {
//                 str += `<option value='` + product.item + `'>` + product.item + `</option>`
//             })
//             product_select.innerHTML = str;
//             company_name.value = lpo.client
//             // alert(products);
//         }
//     })
// }
// function set_product() {
//     let quantity = document.getElementById('product_quantity');
//     let product_value = document.getElementById('product_select').value;
//     products.forEach((product) => {
//         if (product.item === product_value) {
//             quantity.value = product.quantity;
//         }
//     })
// }
function set_js() {
    job_slips.reverse().forEach((js) => {
        if (js.number === document.getElementById('js_select').value) {
            console.log(js);
            document.getElementById('hidden_1').value = js.number;
            document.getElementById('hidden_2').value = js.number;
            document.getElementById('hidden_3').value = js.number;
            document.getElementById('hidden_5').value = js.number;


            document.getElementById('ref').innerHTML = js.ref;
            document.getElementById('product').innerHTML = js.product;
            document.getElementById('style').innerHTML = js.style;
            document.getElementById('quantity').innerHTML = js.quantity;
            document.getElementById('starting_number_1').innerHTML = js.starting_number;
            document.getElementById('cutting_number').innerHTML = js.cutting;
            document.getElementById('cutting_by').innerHTML = js.cutting_by;
            document.getElementById('stitching_by').innerHTML = js.stitching_by;
            document.getElementById('packing_by').innerHTML = js.packing_by;
            document.getElementById('qc_by').innerHTML = js.qc_by;
            document.getElementById('cutting_on').innerHTML = js.cutting_on;
            document.getElementById('stitching_on').innerHTML = js.stitching_on;
            document.getElementById('packing_on').innerHTML = js.packing_on;
            document.getElementById('qc_on').innerHTML = js.qc_on;


            document.getElementById('stitching_number').innerHTML = js.stitching;
            document.getElementById('packing_number').innerHTML = js.packing;
            document.getElementById('delivering_number').innerHTML = js.delivered;
            document.getElementById('qc_number').innerHTML = js.qc;
            document.getElementById("q_cut_input").setAttribute("max", (parseInt(js.quantity) - parseInt(js.cutting)));
            document.getElementById("q_stitched_input").setAttribute("max", (parseInt(js.cutting) - parseInt(js.stitching)));
            document.getElementById("q_qc_input").setAttribute("max", (parseInt(js.stitching) - parseInt(js.qc)));
            document.getElementById("q_packed_input").setAttribute("max", (parseInt(js.qc) - parseInt(js.packing)));
            // document.getElementById("done_btn").setAttribute("href","/job_slip/complete/"+js.number);
        }
    })
}
load_lpos_styles();

function generate_slip() {
    let number = document.getElementById('js_select_1').value;
    let start = document.getElementById('printing_start_number').value;
    let quantity = document.getElementById('printing_quantity').value;
    job_slips.reverse().forEach((job_slip) => {
        if (job_slip.number === number) {
            if (job_slip.quantity >= quantity && start >= job_slip.starting_number) {

                let d = new Date(), str = '';

                let date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear(),
                    item = job_slip.product,
                    lpo = job_slip.ref,
                    //js_num = job_slip.number,
                    person = job_slip.person,
                    measurements = job_slip.measurements,
                    size = job_slip.size,
                    company = job_slip.ref.split("/")[1],
                    style = job_slip.style,
                    style_details;
                styles.forEach((style_) => {
                    if (style_.title === style) {
                        style_details = style_.details
                    }
                });
                for (let i = 1; i <= quantity; i++) {
                    js_num = parseInt(start) + (i - 1);

                    str += `
                   <div style="width: 100%;margin:5px; max-height: 630px;min-height: 630px ; border-bottom:3px dotted black">
        <div style="width: 100%;display: block;border-bottom: 1px dashed black;">
            <h5 style="text-align: center; padding:0; margin: 0px ;margin-top:15px">ABBAS ALI & SONS</h5>
            <h6 style="text-align: center; padding:0; margin: 0px ;margin-top:5px">Uniforms Co.</h6>
            <p style="text-align: center;margin-bottom: 0px; padding: 0px;font-size: 14px"><b>PRODUCTION
                    DEPARTMENT / JOB SLIP</b></p>
        </div>
        <div style="width: 100%;display: block;padding-left:30px;padding-right:30px;">
            <div style="width:100%;margin-bottom: 10px">
                <div style="display: flex ; margin-bottom:10px">
                    <div style="flex: 1">
                        <div style="font-size: 14px">DATE: <span style='font-size:16px'>${date}</span></div>
                    </div>
                    <div style="flex: 1">
                        <div style="font-size: 14px">SLIP # : <span style='font-size:16px'>${js_num}</span></div>
                    </div>
                    <div style="flex: 1">
                        <div>
                            <div style="font-size: 14px">LPO# : <span style='font-size:16px'>${lpo}</span></div>
                        </div>
                    </div>
                </div>
                <div style="display: flex ; margin-bottom:10px">
                    <div style="flex: 1">
                        <div style=" font-size: 14px">COMPANY : <span style='font-size:16px'>${company}</span></div>
                    </div>
                    <div style="flex: 1">
                        <div style=" font-size: 14px">PERSON: <span style='font-size:16px'>${person}</span></div>
                    </div>
                    <div style="flex: 1">
                        <div style=" font-size: 14px">DEP/DES : <span style='font-size:16px'>${person}</span></div>
                    </div>
                </div>


                <div style="display: flex ; margin-bottom:10px">
                    <div style="flex: 1">
                        <div style="font-size:14px">ITEM : <span style='font-size:16px'>${item}</span></div>
                    </div>
                    <div style="flex: 1">
                        <div style="font-size:14px">STYLE : <span style='font-size:16px'>${style}</span></div>
                    </div>
                    <div style="flex: 1">
                        <div style="font-size:14px">QTY : <span style='font-size:16px'>1</span></div>
                    </div>
                </div>

                <div style="display: flex ; margin-bottom:10px">
                    <div style="flex: 1">
                        <div style="font-size: 14px">Size :  ${size}</div>
                    </div>
                   
                </div>
               
                <div style="display: flex">
                    <div style="flex: 1; font-size: 14px">Measurement Detail</div>
                    <div style="flex: 4; word-wrap: break-word; font-size: 14px ; min-height:200px">
                        <p style='font-size:16px'>${measurements}</p>
                    </div>
                </div>
            </div>
            <div style="width: 100%;">
                <div style="width:50%;display: inline;font-size:14px">Cutting Date/Cut By <span>_ _ _ _ _ _ _ _ _ _
                        _ _
                        _ _ </span></div>
                <div style="width:50%;display: inline;float: right;font-size:14px">Stitching <span>_ _ _ _ _ _ _ _
                        _ _
                        _ _ _ _ </span></div>
            </div>
            <div style="width: 100%;">
                <div style="width:50%;display: inline;font-size:14px">Quality Check Date/Quality Check By <span>_ _
                        _ _
                        _ _ _ _ _ _ _ _ _ _ </span></div>
                <div style="width:50%;display: inline;float: right;font-size:14px">Recieved in Store By <span>_ _ _
                        _ _
                        _ _ _ _ _ _ _ _ _ </span></div>
            </div>
            <div style="width: 100%;">
                <div style="width:50%;display: inline;font-size:14px">Store Recieving Date <span>_ _ _ _ _ _ _ _ _
                        _ _
                        _ _ _ </span></div>
                <div style="width:50%;display: inline;float: right;font-size:14px">JOB SLIP PRINT DATE <span>
                        ${date}</span></div>
            </div>
        </div>
    </div>
    `;
                }

                document.getElementById("printing_area").innerHTML = str;
                document.getElementById("print_btn").disabled = false;
                // alert(JSON.stringify(job_slip));

            }
            else {
                alert(`quantity must be equal or less than ${job_slip.quantity} and starting sequence should be equal or greater than ${job_slip.starting_number}`);
            }
        }
    })

};
function generate_slips() {
    let start = document.getElementById('printing_start_number').value;
    let number = document.getElementById('js_select_1').value;
    let quantity = document.getElementById('printing_quantity').value;
    let printing_area = document.getElementById('printing_area');
    job_slips.forEach((job_slip) => {
        if (job_slip.number === number) {
            if (job_slip.quantity >= quantity && start >= job_slip.starting_number) {
                let barcode_num, qty, item, lpo, style, company, str = '';
                item = job_slip.product;
                style = job_slip.style;
                lpo = job_slip.ref;
                company = job_slip.ref.split("/")[1];
                console.log(company);

                for (let i = 1; i <= quantity; i++) {
                    barcode_num = parseInt(start) + (i - 1);

                    qty = i;

                    str += `<div style="max-height:2in;max-width: 3in;min-width:3in;min-height:4in;max-height:4in">
                <div style="padding: 10px; border: 2px dotted black;margin: 2px;border-radius:5px;margin:4px;margin-top:16px">
                    
                    <div style="display:flex">
                        <h4 style='text-align:center'>Uniforms Co.</h4>
                    </div>
                    <div style="display:flex">
                        <div style="flex:1;font-size: 14px">Customer: <span style='font-weight:800;font-size:14px'>${company}</span></div>
                    </div>
                    <div style="display:flex">
                        <div style="flex:1;font-size: 14px">Person: <span style='font-weight:800;font-size:14px'>${job_slip.person}</span></div>

                    </div>
                    <div style="display:flex">
                            <div  style="flex:1;font-size: 14px">Item: <span style='font-weight:800;font-size:14px'>${item}</span></div>
                            <div style="flex:1;font-size: 14px">Size: <span style='font-weight:800;font-size:14px'>${job_slip.size}</span> </div>
                    </div>
                    <div style="display:flex">
                        <div style="flex:1;font-size: 14px">PO# : <span style='font-weight:800;font-size:14px'>${lpo}</span></div>
                    </div>
                    <div style="display:flex">
                            <div style="flex:1;font-size: 14px">Qty: <span style='font-weight:800;font-size:14px'>1</span></div>
                            <div style="flex:1;font-size: 14px">Job Slip# : <span style='font-weight:800;font-size:14px'>${barcode_num}</span> </div>
                    </div>
                    <div>
                            <div>
                               <image id='img_`+ i + `' style='max-height:160px;width:90%'/>
                                </div>
                    </div>
                    
                </div>
                <br>
            </div>
                    `


                }
                printing_area.innerHTML = str;
                for (let i = 1; i <= quantity; i++) {
                    barcode_num = parseInt(start) + (i - 1);

                    JsBarcode("#img_" + i, barcode_num);

                }
                document.getElementById("print_btn").disabled = false;





            }
            else {
                alert(`quantity must be equal or less than ${job_slip.quantity} and starting sequence should be equal or greater than ${job_slip.starting_number}`);
            }

        }
    })

}
function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}
function jsp_set(e) {
    let lpo = document.getElementById('jsp_l'),
        product = document.getElementById('jsp_p'),
        quantity = document.getElementById('jsp_q'),
        starting = document.getElementById('jsp_s');
    lpo.innerHTML = "";
    product.innerHTML = "";
    quantity.innerHTML = "";
    starting.innerHTML = "";


    //    alert(e.value);
    job_slips.forEach((job_slip) => {
        if (job_slip.number === e.value) {
            lpo.innerHTML = job_slip.ref;
            product.innerHTML = job_slip.product;
            quantity.innerHTML = job_slip.quantity;
            starting.innerHTML = job_slip.starting_number;
        }
    })


}


function bc_info(e) {
    let bc_num = e.value;
    document.getElementById('bc_info').innerHTML = `<div><i>Loading.....</i></div>`;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let success = JSON.parse(this.responseText).success;
            if (success) {
                let cutting = JSON.parse(this.responseText).cutting ? "Done" : "Not Done";
                let stitching = JSON.parse(this.responseText).stitching ? "Done" : "Not Done";
                let qc = JSON.parse(this.responseText).qc ? "Done" : "Not Done";
                let packing = JSON.parse(this.responseText).packing ? "Done" : "Not Done";

                let str = `
                    <div class='container-fluid'>
                    <div class='row'>
                        <div class='col-md-6'>Cutting</div>
                        <div class='col-md-6'>${cutting}</div>
                    </div>
                    <div class='row'>
                        <div class='col-md-6'>Stitching</div>
                        <div class='col-md-6'>${stitching}</div>
                    </div>
                    <div class='row'>
                        <div class='col-md-6'>QC</div>
                        <div class='col-md-6'>${qc}</div>
                    </div>
                    <div class='row'>
                        <div class='col-md-6'>Packing</div>
                        <div class='col-md-6'>${packing}</div>
                    </div>
                        </div>`
                document.getElementById('bc_info').innerHTML = str;

                console.log(cutting, stitching, qc, packing)

            }
            else {
                msg = JSON.parse(this.responseText).msg;

                document.getElementById('bc_info').innerHTML = `<div>${msg}</div>`;

                //  alert(msg)
            }
        }
    };
    xhttp.open("POST", "/barcode_info", true);
    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhttp.send("bc_num=" + bc_num);


    console.log(e.value)
}

