import { useContext, useEffect, useRef, useState } from "react";
import React from 'react'
import authContext from "../CONTEXT/AuthContext";

export default function MyAccount() {

    const ctx = useContext(authContext);
  return (
    <div>
<center>
<div  class="p-5 m-2 border border-5  rounded border-success">
        <div  class="userbox border border-5  rounded-circle border-success">
                    <img class="img-fluid rounded-circle" src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg" name="aboutme"/>
                   </div>
                    <p  style={{marginBottom:-3}}><strong>{ctx.username}</strong></p>

                    <span class="badge badge-pill badge-success">online</span>:
                 </div>
                   
                    </center>		


    </div>
  )
}
