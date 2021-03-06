import { AppBar, Box, Button, Card, CardContent, CardHeader, Container, Grid, Toolbar, Typography, useTheme } from '@mui/material';
import { invoke } from '@tauri-apps/api';
import { open } from '@tauri-apps/api/dialog';
import { readTextFile, writeFile } from '@tauri-apps/api/fs';
import { dataDir, join } from '@tauri-apps/api/path';
import { APPLICATION_NAME } from './constants';

function logAndRethrow(error: Error): never {
  console.error(error)
  alert(error)
  throw error
}

async function getDataDirPath() {
  // Available standard app directories
  // https://tauri.app/v1/api/js/enums/fs.basedirectory/
  // How to get their path on different platforms
  // https://tauri.app/v1/api/js/modules/path/
  // How to enable access to them
  // https://tauri.app/v1/api/js/modules/fs/
  const dataDirPath = await dataDir()
  return await join(dataDirPath, APPLICATION_NAME)
}

async function getTestFilePath() {
  const dataDirPath = await getDataDirPath()
  return await join(dataDirPath, 'test.txt')
}

function OpenDataDirButton() {
  return (
    <Button
      fullWidth
      variant="contained"
      color="secondary"
      onClick={async () => {
        const dataDirPath = await getDataDirPath()
        await open({
          title: 'Data directory',
          defaultPath: dataDirPath,
        })
      }}
    >Open data dir</Button>
  )
}

function App() {
  const theme = useTheme()
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <AppBar title="Hello World" position='absolute'>
        <Toolbar>
          <Typography variant="h4">Tauri App</Typography>
        </Toolbar>
      </AppBar>
      <main style={{ width: '100%', height: '100%' }}>
        <Container maxWidth="sm" style={{ marginTop: theme.spacing(10) }}>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
              <Grid item sm={6} xs={12}>
                <Card>
                  <CardHeader title="Javascript" />
                  <CardContent>
                    <Button
                      fullWidth
                      variant='contained'
                      color='primary'
                      onClick={async () => {
                        const filePath = await getTestFilePath().catch(logAndRethrow)
                        writeFile(filePath, 'Hello World').catch(logAndRethrow)
                      }}
                    >
                      Write File
                    </Button>
                    <Box mt={2} />
                    <Button
                      fullWidth
                      variant='contained'
                      color='primary'
                      onClick={async () => {
                        const filePath = await getTestFilePath().catch(logAndRethrow)
                        readTextFile(filePath).then(alert).catch(logAndRethrow)
                      }}
                    >
                      Read File
                    </Button>
                    <Box mt={2} />
                    <OpenDataDirButton />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Card>
                  <CardHeader title="Rust with Invoke" />
                  <CardContent>
                    <Button
                      fullWidth
                      variant='contained'
                      color='primary'
                      onClick={async () => {
                        const filePath = await getTestFilePath().catch(logAndRethrow)
                        invoke('custom_write_file_function', { filePath, content: 'Hello World Invoked' }).catch(logAndRethrow)
                      }}
                    >
                      Write File
                    </Button>
                    <Box mt={2} />
                    <Button
                      fullWidth
                      variant='contained'
                      color='primary'
                      onClick={async () => {
                        const filePath = await getTestFilePath().catch(logAndRethrow)
                        invoke('custom_read_file_function', { filePath }).then(alert).catch(logAndRethrow)
                      }}
                    >
                      Read File
                    </Button>
                    <Box mt={2} />
                    <OpenDataDirButton />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div >
  );
}

export default App;
