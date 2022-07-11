import { AppBar, Box, Button, Container, Grid, Toolbar, Typography, useTheme } from '@mui/material';
import { invoke } from '@tauri-apps/api';
import { writeFile } from '@tauri-apps/api/fs';

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
                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  onClick={async () => {
                    await writeFile('./test.txt', 'Hello World')
                  }}
                >
                  Write File
                </Button>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  onClick={async () => {
                    await invoke('custom_read_file_function', { filePath: './test.txt' })
                  }}
                >
                  Read File with Invoke
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div >
  );
}

export default App;
