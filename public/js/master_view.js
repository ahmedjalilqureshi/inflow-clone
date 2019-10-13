function load_job_slips(){
  var xhttp = new XMLHttpRequest();
  let c= 1;
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let job_slips = JSON.parse(this.responseText).job_slips;
      console.log('js',job_slips)
      let table = document.getElementById('job_slips_table');
      let str = '';
      job_slips.reverse().forEach((js) => {
       
        str += `
        <tr><td>${c}</td>
            <td>${js.ref}</td>
            <td>${js.style}</td>
            <td>${js.product}</td>
            <td>${js.quantity}</td>
            <td>${js.measurements}</td>
            <td>${js.size}</td>
            <td>${js.person}</td>
            <td>${js.starting_number + "-"+parseInt(js.starting_number+js.quantity -1)}</td>
            <td>${js.cutting}</td>
            <td>${js.stitching}</td>
            <td>${js.qc}</td>
            <td>${js.packing}</td>
            <td>${js.delivered}</td>
          <td><button onClick="delete_any('/delete_job_slip','${js._id}'
            )" class="btn btn-danger">Delete</button></td></tr>`
            c++;
          });
      table.innerHTML = str;
    }
  };
  xhttp.open("GET", "/get_job_slips", true);
  xhttp.send();
}
load_job_slips();
function load_lpos() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let lpos = JSON.parse(this.responseText).lpos;
      let table = document.getElementById('lpos_table');
      let str = '';
      lpos.forEach((lpo) => {
        let str1 = `<table  style='font-size:12px;border:1px solid beige'><tbody>`;
        let items = JSON.parse(lpo.items_array);
        items.forEach((item) => {
          str1 += `<tr><th>` + item.item + `</th><th>` + item.quantity + `</th><th>` + item.price +
            `(${lpo.currency})</th></tr>`;
        });
        str1 += `</tbody></table>`;
        str += '<tr><td>' + lpo.lpo_number + '</td><td>' + lpo.ref + '</td><td>' + lpo.client + '</td><th>' +
          str1 + '</th><td>' + lpo.discount + '</td><td>' + lpo.tax + '%</td><td>' + lpo.total + '(' + lpo
          .currency + ')</td><td>' + lpo.date + '</td><td>' + lpo.due_date + '</td><td><button onClick="delete_any(`/delete_lpo`,`' + lpo._id +
          '`)" class="btn btn-danger">Delete</button></td></tr>'
      });
      table.innerHTML = str;
    }
  };
  xhttp.open("GET", "/get_lpos", true);
  xhttp.send();
}

function load_pos() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let pos = JSON.parse(this.responseText).pos;
      let table = document.getElementById('pos_table');
      let str = '';
      pos.forEach((po) => {
        let str1 = `<table  style='font-size:12px;border:1px solid beige'><tbody>`;
        let items = JSON.parse(po.purchase_array);
        items.forEach((item) => {
          str1 += `<tr><th>` + item.item + `</th><th>` + item.quantity + `</th><th>` + item.price +
            `(${po.currency})</th></tr>`;
        });
        str1 += `</tbody></table>`;
        str += '<tr><td>' + po.po_num + '</td><td>' + po.ref + '</td><td>' + po.vendor + '</td><th>' + str1 +
          '</th><td>' + po.total + '(' + po.currency + ')</td><td>' + po.date + '</td><td>' + po.p_date +
          '</td><td><button onClick="delete_any(`/delete_po`,`' + po._id +
          '`)" class="btn btn-danger">Delete</button></td></tr>'
      });
      table.innerHTML = str;
    }
  };
  xhttp.open("GET", "/get_pos", true);
  xhttp.send();
}

function load_items() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let items = JSON.parse(this.responseText).items;
      let table = document.getElementById('items_table');
      let str = '';
      items.forEach((item) => {
        str += '<tr><td>' + item.name + '<input type="hidden" value="' + item.name +
          '"></td><td><input value="' + item.detail + '"  class="form-control" ></td><td><input value="' +
          item.price +
          '" type="number" class="form-control"></td><td><button class="btn btn-primary" onclick="edit_product(this)">Edit</button></td><td><button class="btn btn-danger" onClick="delete_any(`/delete_product`,`' +
          item._id + '`)">Delete</button></td></tr></form>'
      });
      table.innerHTML = str;
      console.log(items);
    }
  };
  xhttp.open("GET", "/get_items", true);
  xhttp.send();
}

function edit_product(e) {
  let product = e.parentNode.parentNode.getElementsByTagName('td')[0].getElementsByTagName('input')[0].value,
    details = e.parentNode.parentNode.getElementsByTagName('td')[1].getElementsByTagName('input')[0].value,
    price = e.parentNode.parentNode.getElementsByTagName('td')[2].getElementsByTagName('input')[0].value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      alert("product information is updated");
      window.location.reload();

    }
  };
  xhttp.open("POST", "/edit_item", true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  xhttp.send("name=" + product + "&details=" + details + "&price=" + price);
}

function load_raw_items() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let raw_items = JSON.parse(this.responseText).raw_items;
      let table = document.getElementById('raw_items_table');
      let str = '';
      raw_items.forEach((raw_item) => {
        //  <tr><td>'+item.name+'<input type="hidden" value="'+item.name+
        // '"></td><td><input value="'+item.detail+'"  class="form-control" ></td><td><input value="'+item.price+'" type="number" class="form-control"></td><td><button class="btn btn-primary" onclick="edit_product(this)">Edit</button></td></tr></form>'

        str += '<tr><td>' + raw_item.name + '(' + raw_item.unit + ')<input type="hidden" value="' + raw_item
          .name +
          '"></td><td><input value="' + raw_item.detail +
          '"  class="form-control" > </td><td><input value="' + raw_item.unit +
          '"  class="form-control" ></td><td><button class="btn btn-primary" onclick="edit_raw_item(this)">Edit</button></td><td><button class="btn btn-danger" onClick="delete_any(`/delete_raw_item`,`' +
          raw_item._id + '`)">Delete</button></td></tr>'
      });
      table.innerHTML = str;
      console.log(raw_items);
    }
  };
  xhttp.open("GET", "/get_raw_items", true);
  xhttp.send();
}

function edit_raw_item(e) {
  let product = e.parentNode.parentNode.getElementsByTagName('td')[0].getElementsByTagName('input')[0].value,
    details = e.parentNode.parentNode.getElementsByTagName('td')[1].getElementsByTagName('input')[0].value,
    unit = e.parentNode.parentNode.getElementsByTagName('td')[2].getElementsByTagName('input')[0].value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      alert("product information is updated");
      window.location.reload();

    }
  };
  xhttp.open("POST", "/edit_raw_item", true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  xhttp.send("name=" + product + "&details=" + details + "&unit=" + unit);

}

function edit_vendor(e) {
  let company_name = e.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML,
    name = e.parentNode.parentNode.getElementsByTagName('td')[1].getElementsByTagName('input')[0].value,
    street = e.parentNode.parentNode.getElementsByTagName('td')[2].getElementsByTagName('textarea')[0].value,
    city = e.parentNode.parentNode.getElementsByTagName('td')[3].getElementsByTagName('input')[0].value,
    phone = e.parentNode.parentNode.getElementsByTagName('td')[4].getElementsByTagName('input')[0].value,
    email = e.parentNode.parentNode.getElementsByTagName('td')[5].getElementsByTagName('input')[0].value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      alert("Vendor information is updated");
      window.location.reload();

    }
  };
  xhttp.open("POST", "/edit_vendor", true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  xhttp.send("street=" + street + "&name=" + name + "&city=" + city + "&phone=" + phone + "&email=" + email +
    "&company_name=" + company_name);


}

function edit_client(e) {
  let company_name = e.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML,
    name = e.parentNode.parentNode.getElementsByTagName('td')[1].getElementsByTagName('input')[0].value,
    street = e.parentNode.parentNode.getElementsByTagName('td')[2].getElementsByTagName('textarea')[0].value,
    city = e.parentNode.parentNode.getElementsByTagName('td')[3].getElementsByTagName('input')[0].value,
    phone = e.parentNode.parentNode.getElementsByTagName('td')[4].getElementsByTagName('input')[0].value,
    email = e.parentNode.parentNode.getElementsByTagName('td')[5].getElementsByTagName('input')[0].value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      alert("Vendor information is updated");
      window.location.reload();

    }
  };
  xhttp.open("POST", "/edit_client", true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  xhttp.send("street=" + street + "&name=" + name + "&city=" + city + "&phone=" + phone + "&email=" + email +
    "&company_name=" + company_name);


}

function edit_fabric(e) {
  let fc = e.parentNode.parentNode.getElementsByTagName('td')[0].getElementsByTagName('input')[0].value,
    name = e.parentNode.parentNode.getElementsByTagName('td')[1].getElementsByTagName('input')[0].value,
    detail = e.parentNode.parentNode.getElementsByTagName('td')[2].getElementsByTagName('input')[0].value;
  width = e.parentNode.parentNode.getElementsByTagName('td')[3].getElementsByTagName('input')[0].value;
  color = e.parentNode.parentNode.getElementsByTagName('td')[4].getElementsByTagName('input')[0].value;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      alert("Fabric information is updated");
      window.location.reload();

    }
  };
  xhttp.open("POST", "/edit_fabric", true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  xhttp.send("fabric_code=" + fc + "&name=" + name + "&detail=" + detail + "&width=" + width + "&color=" + color);

}

function load_styles() {

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      let styles = JSON.parse(this.responseText).styles;
      console.log("styles", styles);

      let table = document.getElementById('styles_table');
      let str = '';
      //  str += '<tr><td>'+style.title+'</td><td>'+style.fabric_code+'</td><td>'+style.product+'</td><td>'+
      //      style.gender+'</td><td>'+style.details+'</td><td>'+style.measurements+
      //        '</td><td>'+style.logo+'</td><td><image src="'+style.picture+'" width="100px" /></td></tr>'

      styles.forEach((style) => {
        console.log(style);
        let product_list = JSON.parse(style.product);
        let pro_text = '';
        product_list.forEach((product) => {
          pro_text +=
            `<div style='border:1px solid white'><div style="width:20%;display:inline;border:1px solid green">` +
            product.product +
            `</div><div style="width:20%;display:inline;border:1px solid green">` + product.fabric_code +
            `</div><div style="width:40%;display:inline;border:1px solid green">` + product.details +
            `</div><div style="width:20%;display:inline;border:1px solid green" >` + product.logo +
            `</div></div><br>`
        })
        str += '<tr><td>' + style.title + '</td><td>' + style.gender +
          '</td><td style="overflow-x:scroll">' + pro_text + '</td><td><image src="' + style.picture +
          '" width="100px" /></td><td><button onClick="delete_any(`/delete_style`,`' + style._id +
          '`)" class="btn btn-danger">Delete</button></td></tr>'
      });
      table.innerHTML = str;
    }
  };
  xhttp.open("GET", "/get_styles", true);
  xhttp.send();
}

function load_fabrics() {

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      let fabrics = JSON.parse(this.responseText).fabrics;
      console.log("fabrics", fabrics);

      let table = document.getElementById('fabrics_table');
      let str = '';
      fabrics.forEach((fabric) => {
        str += `<tr><td>` + fabric.fabric_code + `<input type="hidden" value="` + fabric.fabric_code + `"></td>
    <td><input type='text' class='form-control' value='` + fabric.name + `' ></td>
    <td><input type='text' class='form-control' value='` + fabric.detail + `' ></td>
    <td> <input type='text' class='form-control' value='` + fabric.width + `'></td>
    <td><input type='text' class='form-control' value='` + fabric.color + `'></td>
    <td><button class='btn btn-primary' onClick='edit_fabric(this)'>Edit</button></td>
    <td><button class="btn btn-danger" onClick="delete_any('/delete_fabric','` + fabric._id +
          `')">Delete</button></td></tr>`
      });
      table.innerHTML = str;
    }
  };
  xhttp.open("GET", "/get_fabrics", true);
  xhttp.send();
}

function load_clients() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      let clients = JSON.parse(this.responseText).clients;
      let table = document.getElementById('clients_table');
      let str = '';
      clients.forEach((client) => {
        str += '<tr><td>' + client.company_name + '</td><td><input value="' + client.name +
          '" class="form-control"></td><td><textarea class="form-control">' + client.street +
          '</textarea></td><td><input value="' + client.city +
          '" class="form-control"></td><td><input value="' + client.phone +
          '" class="form-control"></td><td><input value="' + client.email +
          '" class="form-control"></td><td><button class="btn btn-primary" onclick="edit_client(this)">Edit</button></td><td><button class="btn btn-danger" onClick="delete_any(`/delete_client`,`' +
          client._id + '`)">Delete</button></td></tr>'
      });
      table.innerHTML = str;
      console.log(clients);
    }
  };
  xhttp.open("GET", "/get_clients", true);
  xhttp.send();
}

function load_vendors() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let vendors = JSON.parse(this.responseText).vendors;
      let table = document.getElementById('vendors_table');
      let str = '';
      vendors.forEach((vendor) => {
        str += '<tr><td>' + vendor.company_name + '</td><td><input value="' + vendor.name +
          '" class="form-control"></td><td><textarea class="form-control">' + vendor.street +
          '</textarea></td><td><input value="' + vendor.city +
          '" class="form-control"></td><td><input value="' + vendor.phone +
          '" class="form-control"></td><td><input value="' + vendor.email +
          '" class="form-control"></td><td><button class="btn btn-primary" onclick="edit_vendor(this)">Edit</button></td><td><button class="btn btn-danger" onClick="delete_any(`/delete_vendor`,`' +
          vendor._id + '`)">Delete</button></td></tr>'
      });
      table.innerHTML = str;
      console.log(vendors);

    }
  };
  xhttp.open("GET", "/get_vendors", true);
  xhttp.send();
}
load_styles();
load_fabrics();
load_pos();
load_lpos();
load_items();
load_raw_items();
load_clients();
load_vendors();

function search(input, table) {
  var input, filter, found, table, tr, td, i, j;
  input = document.getElementById(input);
  filter = input.value.toUpperCase();
  table = document.getElementById(table);
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    let st = tr[i];
    let pr = tr[i].parentNode;
    if(pr!==table){
      tr[i].style.display = "";
    }
    else{
      td = tr[i].getElementsByTagName("td");
    for (j = 0; j < td.length; j++) {
      if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
        found = true;
      }
    }
    if (found) {
      tr[i].style.display = "";
      found = false;
    } else {
      tr[i].style.display = "none";
    }
    }
   
  }
}

function delete_any(route, id) {
  console.log(route, id)
  swal("Are you sure,You want to delete this item?", {
    dangerMode: true,
    buttons: true,
  }).then((done) => {
    if (done) {
      var xhttp7 = new XMLHttpRequest();
      xhttp7.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

          swal('successfully deleted');
          let item = JSON.parse(this.responseText).item;
          switch (item) {
            case 'Style':
              load_styles();
              break;
              case 'Job Slip':
              load_job_slips();
              break;
            case 'Vendor':
              load_vendors();
              break;
            case 'Client':
              load_clients();
              break;
            case 'Fabric':
              load_fabrics();
              break;
            case 'Product':
              load_items();
              break;
            case 'Raw_item':
              load_raw_items();
              break;
              case 'LPO':
              load_lpos();
              break;
              case 'PO':
              load_pos();
              break;  
          }


        }
      };
      xhttp7.open("POST", route, true);
      xhttp7.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp7.send("id=" + id);

    }
  });

}
