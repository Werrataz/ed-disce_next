function Toolbar({ uniqueId, isActive }) {
  return (
    <div className={isActive ? "toolbar" : "toolbar hide"}>
      <div id={uniqueId}>
        <select className="ql-header">
          <option value="1">Titre</option>
          <option value="2">Sous-titre</option>
          <option value="">Normal</option>
        </select>
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
        <button className="ql-strike"></button>
        <select className="ql-color">
          <option value="#000000"></option>
          <option value="#e60000"></option>
          <option value="#ff9900"></option>
          <option value="#ffff00"></option>
          <option value="#008a00"></option>
          <option value="#0066cc"></option>
        </select>
        <select className="ql-background">
          <option value=""></option>
          <option value="rgba(255, 153, 0, 0.3)"></option>
          <option value="rgba(255, 255, 0, 0.3)"></option>
          <option value="rgba(0, 138, 0, 0.3)"></option>
          <option value="rgba(0, 102, 204, 0.3)"></option>
          <option value="rgba(153, 51, 255, 0.3)"></option>
        </select>
        <button className="ql-list" value="ordered"></button>
        <button className="ql-list" value="bullet"></button>
        <select className="ql-align">
          <option value=""></option>
          <option value="center"></option>
          <option value="right"></option>
          <option value="justify"></option>
        </select>
        <button className="ql-formula"></button>
      </div>
    </div>
  );
}

export default Toolbar;
