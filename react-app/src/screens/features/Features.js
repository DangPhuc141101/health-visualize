import React, {useState} from 'react'
import './features.css'

const Features = (props) => {

  return (
    <div className='features_container'>
      <div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="Sum"/>
          <label class="form-check-label" for="exampleRadios1">
            Sum
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Average"/>
          <label class="form-check-label" for="exampleRadios2">
            Average
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="Min"/>
          <label class="form-check-label" for="exampleRadios3">
            Min
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="Max"/>
          <label class="form-check-label" for="exampleRadios3">
            Max
          </label>
        </div>
      </div>
    </div>
  )
}

export default Features