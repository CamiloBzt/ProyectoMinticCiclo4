import React from 'react';
import './TaskTable.css';

export const TaskTable = () => {
    return (
        <div className="table__container">
            <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Description</th>
      <th scope="col">Done</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Compras supermercado</td>
      <td>
      <div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked/>
</div>
      </td>
      <td>
         <button type="button" class="btn btn-outline-warning">Edit</button>
      </td>
      <td>
         <button type="button" class="btn btn-outline-danger">Delete</button>
      </td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Compras supermercado</td>
      <td>
      <div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked/>
</div>
      </td>
      <td>
         <button type="button" class="btn btn-outline-warning">Edit</button>
      </td>
      <td>
         <button type="button" class="btn btn-outline-danger">Delete</button>
      </td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Compras supermercado</td>
      <td>
      <div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked/>
</div>
      </td>
      <td>
         <button type="button" class="btn btn-outline-warning">Edit</button>
      </td>
      <td>
         <button type="button" class="btn btn-outline-danger">Delete</button>
      </td>
    </tr>
  </tbody>
</table>
        </div>
    )
}
