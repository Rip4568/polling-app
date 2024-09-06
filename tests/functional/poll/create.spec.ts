import { test } from '@japa/runner'

test.group('Poll CRUD', () => {
  let deviceId: string
  /* test('Poll isolated', async ({ assert }) => {
    const poll = new Poll()
    poll.title = 'foo'
    poll.description = 'bar'
    await poll.save()

    assert.isTrue(poll.id > 0)
  }) */

  test('Poll list', async ({ assert, client }) => {
    const response = await client.get('/api/v1/polls')
    assert.equal(response.status(), 200)
    const responseJson = response.body()
    assert.isTrue(responseJson.message === 'Polls retrieved successfully')
    assert.isTrue(responseJson.polls.length > 0)
    console.info('POLL LIST EXECUTED WITH SUCCESS' + 200)
  })

  test('Poll create', async ({ assert, client }) => {
    deviceId = '123456789'
    /* const response = await client.post('/api/v1/polls').json({
      title: 'foo',
      description: 'bar',
      dateExpiration: '2022-01-01',
      dateBegin: '2022-01-01',
      deviceIdOwner: deviceId,
    }) */
    let response = await client.delete('/api/v1/polls/' + deviceId)
    console.info(response.status())
    /* assert.equal(response.status(), 201)
    const responseJson = response.body()
    assert.isTrue(responseJson.message === 'Poll created successfully')
    assert.isTrue(responseJson.poll.title === 'foo') */
  })

  /* test('Poll show', async ({ assert, client }) => {
    const response = await client.get('/api/v1/polls/' + deviceId)
    assert.equal(response.status(), 200)
    const responseJson = response.body()
    assert.isTrue(responseJson.message === 'Poll retrieved successfully')
    assert.isTrue(responseJson.poll.title === 'foo')
  }) */

  /* test('Poll Delete', async ({ assert, client }) => {
    const response = await client.delete('/api/v1/polls/' + deviceId)
    assert.equal(response.status(), 200)
    const responseJson = response.body()
    assert.isTrue(responseJson.message === 'Poll deleted successfully')
  }) */
})
