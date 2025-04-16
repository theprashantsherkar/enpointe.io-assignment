import React from "react";

export default function Input({ type, label, placeholder, changeFunc, values, styles }) {
    return <div>
        <input
            type={type}
            id=""
            name=""
            onChange={changeFunc}
            value={values}
            placeholder={placeholder}
            className={styles}
        />
    </div>
}