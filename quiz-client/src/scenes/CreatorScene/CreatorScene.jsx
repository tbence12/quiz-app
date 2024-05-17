/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Skeleton,
  Space,
  Steps,
  Switch,
  message,
} from 'antd'
import {
  ArrowRightOutlined,
  CloseOutlined,
  QuestionOutlined,
} from '@ant-design/icons'
import { Scene } from '../../components/Scene'
import './CreatorScene.scss'
import { getRawQuestions } from '../../app/slicers/questionSlice'
import Question from '../../app/apiCall/Question'
import Quiz from '../../app/apiCall/Quiz'

function CreatorScene() {
  const [quizName, setQuizName] = useState('')
  const [myQuestions, setMyQuestions] = useState([])
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent(current + 1)
  }

  const steps = [
    {
      title: 'Név megadás',
      content: <AddQuizName />,
    },
    {
      title: 'Kérdések',
      content: (
        <AddQuestions
          quizName={quizName}
          myQuestions={myQuestions}
          setMyQuestions={setMyQuestions}
        />
      ),
    },
  ]

  const addName = (values) => {
    setQuizName(values.quizName)
    next()
  }

  function AddQuizName() {
    return (
      <div className="form-container">
        <Form name="normal_login" className="login-form" onFinish={addName}>
          <Form.Item
            name="quizName"
            rules={[
              {
                required: true,
                message: 'Kérlek írd be a kvíz nevét!',
              },
            ]}
          >
            <Input
              prefix={<QuestionOutlined className="site-form-item-icon" />}
              placeholder="Kvíz neve"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              {steps[current + 1].title}
              <ArrowRightOutlined />
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

  return (
    <Scene title="Kvíz készítő">
      <div className="creator-title">Készítsd el a saját kvízed</div>
      <div className="creator-container">
        <div className="steps-container">
          <Steps
            direction="vertical"
            size="small"
            current={current}
            items={steps}
            className="steps"
          />
        </div>
        <div className="content-container">
          <div className="content">{steps[current].content}</div>
        </div>
      </div>
    </Scene>
  )
}

function AddQuestions({ quizName, myQuestions, setMyQuestions }) {
  const { rawQuestions, loading } = useSelector((state) => state.question)
  const [options, setOptions] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (!rawQuestions.length) {
      dispatch(getRawQuestions())
    }

    if (rawQuestions.length > 0) {
      const buildOptions = rawQuestions.map((question) => ({
        label: question.text,
        value: question._id,
      }))
      setOptions(buildOptions)
    }
  }, [rawQuestions, dispatch])

  const sharedProps = {
    mode: 'multiple',
    style: {
      width: '100%',
    },
    options,
    placeholder: 'Válassz a meglévő kérdések közül',
    maxTagCount: 'responsive',
  }

  const [value, setValue] = useState([])
  const onSelectChange = (selectValues) => {
    setValue(selectValues)
    setMyQuestions(selectValues)
  }
  const selectProps = {
    value,
    onChange: onSelectChange,
  }

  return (
    <>
      <div className="and-or">
        <b>
          Kvíz neve: <span className="quiz-name">{quizName}</span>
        </b>
      </div>
      <Skeleton loading={loading}>
        <Select allowClear {...sharedProps} {...selectProps} />
      </Skeleton>
      <div className="and-or">És / Vagy</div>
      <CustomQuestions quizName={quizName} myQuestions={myQuestions} />
    </>
  )
}

const GeneralQuestion = () => ({
  text: ``,
  answers: [
    {
      number: 1,
      text: '',
      correct: true,
    },
    {
      number: 2,
      text: '',
      correct: false,
    },
    {
      number: 3,
      text: '',
      correct: false,
    },
    {
      number: 4,
      text: '',
      correct: false,
    },
  ],
})

function CustomQuestions({ quizName, myQuestions }) {
  const { user } = useSelector((state) => state.auth)
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const addNewQuestionToForm = () => {
    const { items } = form.getFieldsValue()
    const newItems = [...items, GeneralQuestion()]
    form.setFieldsValue({ items: newItems })
  }

  const onSwitchChange = (checked, questionIndex, answerIndex) => {
    const { items } = form.getFieldsValue()
    const question = items[questionIndex]
    const updatedQuestionAnswers = question.answers.map((answer, index) => ({
      ...answer,
      correct: index === answerIndex,
    }))
    items[questionIndex].answers = [...updatedQuestionAnswers]
    form.setFieldsValue({ items })
  }

  const saveQuestions = async (items) => {
    const newQuestionIds = []

    // eslint-disable-next-line no-restricted-syntax
    for (const item of items) {
      const question = {
        ...item,
        categoryIds: ['6643d3375b69d046873aa27a'],
        usedId: user._id,
      }

      // eslint-disable-next-line no-await-in-loop
      const response = await Question.addNewQuestion(question)
      if (response?.data?._id) {
        newQuestionIds.push(response?.data?._id)
      }
    }

    return newQuestionIds
  }

  const createQuiz = async (values) => {
    const { items } = values

    let newQuestionIds = []

    if (items.length > 0) {
      newQuestionIds = await saveQuestions(items)

      if (newQuestionIds.length < 1) {
        message.success('Sikertelen kvíz létrehozás!')
        return
      }
    }

    const questionIds = [...myQuestions, ...newQuestionIds]

    const quiz = {
      name: quizName,
      questionIds,
    }

    const response = await Quiz.addNewQuiz(quiz)
    if (response?.data?._id) {
      message.success('Sikeres kvíz létrehozás!')
      navigate('/quizzes')

      return
    }

    message.success('Sikertelen kvíz létrehozás!')
  }

  return (
    <Form
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
      }}
      form={form}
      name="dynamic_form_complex"
      style={{
        maxWidth: 600,
      }}
      autoComplete="off"
      initialValues={{
        items: [],
      }}
      onFinish={createQuiz}
    >
      <Form.List name="items">
        {(fields, { remove }) => (
          <div
            style={{
              display: 'flex',
              rowGap: 16,
              flexDirection: 'column',
            }}
          >
            {fields.map((field) => (
              <Card
                size="small"
                title={`${field.name + 1}. Új kérdés`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name)
                    }}
                  />
                }
              >
                <Form.Item
                  label="Kérdés"
                  name={[field.name, 'text']}
                  rules={[
                    {
                      required: true,
                      message: `Kérlek töltsd ki a kérdést!`,
                    },
                  ]}
                >
                  <Input placeholder={`${field.name + 1}. kérdés`} />
                </Form.Item>

                {/* Nest Form.List */}
                <Form.Item label="Válaszok">
                  <Form.List name={[field.name, 'answers']}>
                    {(subFields) => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          rowGap: 16,
                        }}
                      >
                        {subFields.map((subField) => (
                          <Space key={subField.key}>
                            <Form.Item noStyle name={[subField.name, 'number']}>
                              <InputNumber
                                style={{
                                  width: 31,
                                  color: '#DAA520',
                                }}
                                disabled
                              />
                            </Form.Item>
                            <Form.Item
                              noStyle
                              name={[subField.name, 'text']}
                              rules={[
                                {
                                  required: true,
                                  message: `Kérlek add meg a(z) ${
                                    subField.key + 1
                                  }. választ!`,
                                },
                              ]}
                            >
                              <Input
                                placeholder={`${subField.key + 1}. válasz`}
                              />
                            </Form.Item>
                            <Form.Item
                              noStyle
                              name={[subField.name, 'correct']}
                              valuePropName="checked"
                            >
                              <Switch
                                checkedChildren="Helyes"
                                unCheckedChildren="Helytelen"
                                onChange={(checked) =>
                                  onSwitchChange(
                                    checked,
                                    field.key,
                                    subField.key,
                                  )
                                }
                              />
                            </Form.Item>
                          </Space>
                        ))}
                      </div>
                    )}
                  </Form.List>
                </Form.Item>
              </Card>
            ))}

            {/* <Button type="dashed" onClick={() => add()} block> */}
            <Button type="dashed" onClick={() => addNewQuestionToForm()} block>
              + Új kérdés hozzáadás
            </Button>
          </div>
        )}
      </Form.List>

      <Form.Item noStyle shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              form?.getFieldsValue()?.items?.length < 1 &&
              myQuestions.length < 1
            }
            className="create-quiz-button"
          >
            Kvíz készítése
          </Button>
        )}
      </Form.Item>
      <div>{myQuestions}</div>
    </Form>
  )
}

export default CreatorScene
