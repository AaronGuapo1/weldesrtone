const material = require('../models/materiales.js')
const path = require('path')

module.exports = async (req,res)=>{



    for(i=0; i<req.body.DescripcionBusqueda.length;i++){

        if(req.body.Descripcion[i] !== ''){
            await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{Descripcion:req.body.Descripcion[i]}},{ upsert: true });
        }
    }
    
        if(req.body.Codigo[i] !== ''){
        
            await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{Codigo:req.body.Codigo[i]}},{ upsert: true });
        
        }
        if(req.body.Unidad[i] !== ''){
        
            await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{Unidad:req.body.Unidad[i]}},{ upsert: true });
            }
        
            if(req.body.PrecioUnitario[i] !== ''){
        
            await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{PrecioUnitario:req.body.PrecioUnitario[i]}},{ upsert: true });
        
            }
            if(req.body.Familia[i] !== ''){
        
            await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{Familia:req.body.Familia[i]}}),{ upsert: true };
            }
        
            if(req.body.SubFam[i] !== ''){
        
            await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{SubFam:req.body.SubFam[i]}},{ upsert: true });
            
            }
    
    
    
    
   
    res.redirect('/')
    
    
}


// funciona : await material.updateOne({Descripcion:req.body.DescripcionBusqueda[0]},{$set:{PrecioUnitario:req.body.PrecioUnitario[0]}});


/*

await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{Descripcion:req.body.Descripcion[i],Codigo:req.body.Codigo[i],Unidad:req.body.Unidad[i],PrecioUnitario:req.body.PrecioUnitario[i],Familia:req.body.Familia[i],SubFam:req.body.SubFam[i]}},{ upsert: false });



 if(req.body.Descripcion[i] !== ''||req.body.Codigo[i] !== '' || req.body.Unidad[i] !== '',req.body.PrecioUnitario[i] !== '',req.body.Familia[i] !== '',req.body.SubFam[i] !== ''){


    if(req.body.Descripcion[i] !== ''){
    await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{Descripcion:req.body.Descripcion[i]}},{ upsert: true });
}
if(req.body.Codigo[i] !== ''){

    await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{Codigo:req.body.Codigo[i]}},{ upsert: true });

}
if(req.body.Unidad[i] !== ''){

    await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{Unidad:req.body.Unidad[i]}},{ upsert: true });
    }

    if(req.body.PrecioUnitario[i] !== ''){

    await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{PrecioUnitario:req.body.PrecioUnitario[i]}},{ upsert: true });

    }
    if(req.body.Familia[i] !== ''){

    await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{Familia:req.body.Familia[i]}}),{ upsert: true };
    }

    if(req.body.SubFam[i] !== ''){

    await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{SubFam:req.body.SubFam[i]}},{ upsert: true });
}








   await material.updateOne({Descripcion:req.body.DescripcionBusqueda},{$set:{Descripcion:req.body.Descripcion}},{ upsert: true })
    await material.updateOne({Descripcion:req.body.DescripcionBusqueda},{$set:{Codigo:req.body.Codigo}},{ upsert: true })

    await material.updateOne({Descripcion:req.body.DescripcionBusqueda},{$set:{Unidad:req.body.Unidad}},{ upsert: true });
    

    await material.updateOne({Descripcion:req.body.DescripcionBusqueda},{$set:{PrecioUnitario:req.body.PrecioUnitario}},{ upsert: true });



    await material.updateOne({Descripcion:req.body.DescripcionBusqueda},{$set:{Familia:req.body.Familia}}),{ upsert: true };


    await material.updateOne({Descripcion:req.body.DescripcionBusqueda},{$set:{SubFam:req.body.SubFam}},{ upsert: true });



const material = require('../models/materiales.js')
const path = require('path')

module.exports = async (req,res)=>{

//okey, ya funciona, solo que no borre.


for(i=0; i<req.body.DescripcionBusqueda.length;i++){

    if(req.body.Descripcion[i] !== ''){
    await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{Descripcion:req.body.Descripcion[i]}},{ upsert: true });
}
if(req.body.Codigo[i] !== ''){

    await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{Codigo:req.body.Codigo[i]}},{ upsert: true });

}
if(req.body.Unidad[i] !== ''){

    await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{Unidad:req.body.Unidad[i]}},{ upsert: true });
    }

    if(req.body.PrecioUnitario[i] !== ''){

    await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{PrecioUnitario:req.body.PrecioUnitario[i]}},{ upsert: true });

    }
    if(req.body.Familia[i] !== ''){

    await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{Familia:req.body.Familia[i]}}),{ upsert: true };
    }

    if(req.body.SubFam[i] !== ''){

    await material.updateOne({Descripcion:req.body.DescripcionBusqueda[i]},{$set:{SubFam:req.body.SubFam[i]}},{ upsert: true });
    
    }

}  

    res.redirect('/')
    
    
}



const material = require('../models/materiales.js')
const path = require('path')

module.exports = async (req,res)=>{



    for(i=0; i<req.body.DescripcionBusqueda.length;i++){
        var sdoc = {};
        if(req.body.Descripcion[i] != '~~~') {
          sdoc['Descripcion'] = req.body.Descripcion[i]
        }
        if(req.body.Codigo[i] != '~~~') {
          sdoc['Codigo'] = req.body.Codigo[i]
        }
        if(req.body.Unidad[i] != '~~~') {
          sdoc['Unidad'] = req.body.Unidad[i]
        }
        if(req.body.PrecioUnitario[i] != '~~~') {
            sdoc['PrecioUnitario'] = req.body.PrecioUnitario[i]
          }
          if(req.body.Familia[i] != '~~~') {
            sdoc['Familia'] = req.body.Familia[i]
          }
          if(req.body.SubFam[i] != '~~~') {
            sdoc['SubFam'] = req.body.SubFam[i]
          }
        material.updateOne(
                {Descripcion:req.body.DescripcionBusqueda[i]},
                {$set: sdoc},
                { upsert: true });
    }

    res.redirect('/')
    
    
}



*/