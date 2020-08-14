import React from 'react'
import axios from 'axios'
import { endpoint } from '../../consts/consts'

const NodeComponent = ({ node, updateText, handleSetSelectedFilePath }) => {

  const fileClicked = async () => {
    if (node.type === "file") {
      console.log("file clicked!")
      console.log(node)
      handleSetSelectedFilePath(node.path)
      try {

        const response = await axios.get(`${endpoint}/api/file/read?path=${node.path}`)
        const data = response.data
        if (data) {
          console.log(data.data)
          updateText(data.data)
        } else {

          alert('fail1')
        }
      } catch (err) {
        console.log(err.message)
        alert('fail')
      }
    }
  }

  return <li onClick={fileClicked}>{node.name}
    {node.children && <ul>
      {node.children.map((child, index) => {
        return <NodeComponent handleSetSelectedFilePath={handleSetSelectedFilePath} updateText={updateText} key={index} node={child} />
      })}
    </ul>}
  </li>
}

export default NodeComponent