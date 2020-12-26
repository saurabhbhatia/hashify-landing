import * as React from "react";
import { builder } from '@builder.io/sdk'

function tracking() {
  builder.trackConversion();
}

function Tracking() {
    return(<>{tracking()}</>)
};

export default Tracking;