import React, { useEffect, useState } from 'react'
import { openSession } from './connector/enigmaApp'
import BarChart from './BarChart'


// const QlikContext = React.createContext(null)


const QlikObject = ({children}) => {

    const [newModel, setNewModel] = useState([])

    const objectId = 'ETEyKWn'

    useEffect(() => {
        const init = async () => {
            const qDoc = await openSession()
            const qObject = await qDoc.getObject(objectId)
            const properties = await qObject.getProperties()
            const model = await qDoc.createSessionObject(properties)
            const layout = await model.getLayout()

            const { qMatrix } = layout.qHyperCube.qDataPages[0]
            const data = qMatrix.map(([city, amount]) => ({dimension: city.qText, measure: amount.qNum}))
 
            setNewModel(data)
           
        }
        init()
    }, [])
    

    return newModel ? 
        <div>
          <BarChart data={newModel} />
        </div>
        : null
    
}

    export default QlikObject;
