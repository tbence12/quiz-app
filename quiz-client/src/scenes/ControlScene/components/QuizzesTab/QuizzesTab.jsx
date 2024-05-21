/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Skeleton,
  Table,
  Typography,
} from 'antd'
import {
  deleteQuiz,
  editQuiz,
  getQuizzes,
  restoreQuiz,
} from '../../../../app/slicers/quizSlice'
import './QuizzesTab.scss'

function EditableCell({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) {
  const inputNode =
    inputType === 'number' ? (
      <InputNumber />
    ) : (
      <Input style={{ textAlign: 'center' }} />
    )
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `${title} nem lehet üres!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

function QuizzesTab() {
  const { quizzes, loading } = useSelector((state) => state.quiz)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!quizzes.length) {
      dispatch(getQuizzes())
    }
  }, [quizzes, dispatch])

  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = useState('')
  const isEditing = (record) => record._id === editingKey
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      ...record,
    })
    setEditingKey(record._id)
  }
  const cancel = () => {
    setEditingKey('')
    message.warning('Szerkesztés megszakítva')
  }
  const save = async (record) => {
    try {
      const row = await form.validateFields()
      dispatch(editQuiz({ quizId: record._id, quizName: row.name }))
      setEditingKey('')
      message.success('Sikeres kvíz mentés')
    } catch (errInfo) {
      message.error('Sikertelen mentés')
    }
  }

  const handleDelete = (quizId) => {
    dispatch(deleteQuiz(quizId))
    message.success('Sikeres kvíz törlés')
  }

  const handleRestore = (quizId) => {
    dispatch(restoreQuiz(quizId))
    message.success('Sikeres kvíz visszaállítás')
  }

  const columns = [
    {
      title: 'Kvíz neve',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      editable: true,
    },
    {
      title: 'Műveletek',
      dataIndex: 'operation',
      align: 'center',
      width: 200,
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record)}
              style={{
                marginRight: 8,
              }}
            >
              Mentés
            </Typography.Link>
            <Popconfirm
              title="Biztos meg akarod szakítani a szerkesztést?"
              onConfirm={cancel}
              okText="Igen"
              cancelText="Nem"
            >
              <a>Mégse</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
              style={{
                marginRight: 8,
              }}
            >
              Szerkesztés
            </Typography.Link>
            {record.isDeleted ? (
              <Popconfirm
                title="Biztos vissza szeretnéd állítani ezt a kvízt?"
                onConfirm={() => handleRestore(record._id)}
                okText="Igen"
                cancelText="Nem"
              >
                <a>Visszaállítás</a>
              </Popconfirm>
            ) : (
              <Popconfirm
                title="Biztos törölni szeretnéd ezt a kvízt?"
                onConfirm={() => handleDelete(record._id)}
                okText="Igen"
                cancelText="Nem"
              >
                <a>Törlés</a>
              </Popconfirm>
            )}
          </>
        )
      },
    },
  ]

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  return (
    <Skeleton loading={loading}>
      <Form form={form} component={false}>
        <Table
          rowKey="_id"
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={quizzes}
          columns={mergedColumns}
          expandable={{
            expandedRowRender: (record) =>
              record.questions.map((question, index) => {
                return (
                  <p
                    style={{
                      margin: 0,
                      paddingLeft: '50px',
                      background: '#0015291a',
                    }}
                    key={question._id}
                  >
                    {`${index + 1}.  ${question.text}`}
                  </p>
                )
              }),
          }}
          pagination={false}
          className="quizzes-tab"
        />
      </Form>
    </Skeleton>
  )
}

export default QuizzesTab
