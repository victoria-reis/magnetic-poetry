// import { useState } from "react";

// const ColorChange = () => {
//     const [colorchange, setColourChange] = useState('')
    
//     const data1 = [
//         { name: 'red' },
//         { name: 'yellow' },
//         { name: 'green' },
//         { name: 'blue' }
//     ];

//     const handleChange = (event) => {
//        setColourChange(event.target.value)
//     };

//     const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
// //value = a.name = red, yellow, green, blue
//             return (
//                 <div>
//                     <select name="ColorChange" id="colorChange" onChange={handleChange} >
//                         <option value="" >Select a Color</option>
                    
//                         {data1.map((a, index) => {
//                             return (<option key={index} value={colors[index]
//                             }  >{a.name} </option>
                            
//                         )
                        
//                         })}
//                     </select>
//                     <p>{colorchange}</p>
//                 </div>
                
//             );

// }

// export default ColorChange;