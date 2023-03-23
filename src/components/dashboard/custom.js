import $ from "jquery";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";

// if (!$.fn.DataTable.isDataTable("#movieTable")) {
//     $(document).ready(function () {
//         setTimeout(function () {
//             $("#movieTable").DataTable({
//                 pagingType: "full_numbers",
//                 pageLength: 10,
//                 processing: true,
//                 dom: "Bfrtip",
//                 select: {
//                     style: "single",
//                 },

//                 buttons: [
//                     // {
//                     //     extend: "pageLength",
//                     //     className: "btn btn-secondary bg-secondary",
//                     // },
//                     // {
//                     //     extend: "copy",
//                     //     className: "btn btn-secondary bg-secondary",
//                     // },
//                     // {
//                     //     extend: "csv",
//                     //     className: "btn btn-secondary bg-secondary",
//                     // },
//                     // {
//                     //     extend: "print",
//                     //     customize: function (win) {
//                     //         $(win.document.body).css("font-size", "10pt");
//                     //         $(win.document.body)
//                     //             .find("table")
//                     //             .addClass("compact")
//                     //             .css("font-size", "inherit");
//                     //     },
//                     //     className: "btn btn-secondary bg-secondary",
//                     // },
//                 ],

//                 fnRowCallback: function (
//                     nRow,
//                     aData,
//                     iDisplayIndex,
//                     iDisplayIndexFull
//                 ) {
//                     var index = iDisplayIndexFull + 1;
//                     $("td:first", nRow).html(index);
//                     return nRow;
//                 },

//                 lengthMenu: [
//                     [10, 20, 30, 50, -1],
//                     [10, 20, 30, 50, "All"],
//                 ],
//                 columnDefs: [
//                     {
//                         targets: 0,
//                         render: function (data, type, row, meta) {
//                             return type === "export" ? meta.row + 1 : data;
//                         },
//                     },
//                 ],
//             });
//         }, 1000);
//     });
// }