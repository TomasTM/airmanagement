import React from "react"
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
`

export const Row = styled.div`
  width: ${props => props.wdth || "auto"};
  flex-basis: ${props => props.wdth || "auto"};
  text-align: ${(props) => (props.textAlign || 'left')};
  background: #f5f5f5;
  padding: 10px;
  margin: 20px 1%;
  border-radius: 4px;
`
export const MasterRow = styled(Row)`
height: calc(100vh - 120px);
overflow: scroll;
`

export const Card = styled.div`
  position: relative;
  border: 0;
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgb(9 30 66 / 25%);
  background: #fff;
  padding: 10px;
  margin: 10px;
  border-left: ${(props) => (props.isSelected ? '4px solid #32CD32' : 'inherit')};
`

export const Icon = styled.div`
  font-size: 26px;
  color: #ccc;
  margin: 5px;
  text-align:center;
`

export const H3 = styled.h3`
  text-align:center;
`

export const H2 = styled.h2`
  text-align:center;
`
export const P = styled.p`
  text-align:center;
`
export const AvailabilityView = styled.div`
  margin: 10px auto; 
  width: 98%;
  position: relative;
  height: 20px;
  background-color: #f5f5f5;
  :before {
    content:"|";
    font-size: 30px;
    position: absolute;
    left: -6px;
    top: -50%;
  }
  :after {
    content:"|";
    font-size: 30px;
    position: absolute;
    right: -6px;
    top: -50%;
  }
`

export const RemoveIcon = styled.div`
  position: absolute;
  cursor: pointer;
  color: red;
  right: 15px;
`
