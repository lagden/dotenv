'use strict'

import {join} from 'path'
import test from 'ava'
import {streamEnv, syncEnv} from '../.'

test.cb('stream', t => {
	t.plan(2)
	streamEnv()
		.on('end', () => {
			t.is(process.env.DEBUG, 'tadashi-dotenv')
			t.is(process.env.DOTENV, 'awesome')
			t.end()
		})
})

test.cb('stream error', t => {
	t.plan(1)
	streamEnv('not_found', '/tmp')
		.on('error', err => {
			t.is(err.message, `ENOENT: no such file or directory, open '/tmp/not_found'`)
			t.end()
		})
})

test('sync', t => {
	const r = syncEnv()
	t.true(r)
	t.is(process.env.DEBUG, 'tadashi-dotenv')
	t.is(process.env.DOTENV, 'awesome')
})

test('sync error', t => {
	const error = t.throws(() => {
		syncEnv('not_found', '/tmp')
	}, Error)
	t.is(error.message, `ENOENT: no such file or directory, open '/tmp/not_found'`)
})

test('crlf', t => {
	const r = syncEnv('env.crlf', join(__dirname, 'fixtures'))
	t.true(r)
	t.is(process.env.DEBUG, 'tadashi-dotenv')
	t.is(process.env.DOTENV, 'awesome')
	t.is(process.env.WIN, 'crlf')
})
