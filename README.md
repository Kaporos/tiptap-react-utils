# tiptap-react-utils

Here's a sample use of this lib:
    ```typescript
    import { Node, NodeViewWrapper } from "@tiptap/react"
    import {getBasicNodeConfiguration, NodeProps} from "tiptap-react-utils"

    class SuperAttributes {
      count: number = 0
    }

    function Super(props: NodeProps<SuperAttributes>) {
      const increase = () => {
        props.updateAttributes({
          count: props.node.attrs.count + 1
        })
      }
      return (
        <NodeViewWrapper>
          <span> {props.node.attrs.count } </span>
          <button onClick={increase}>Increase</button>
        </NodeViewWrapper>
      )
    }


    const SuperNode = Node.create({
      ...getBasicNodeConfiguration("super-node", Super, SuperAttributes),
    })

    export default SuperNode

