import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { writeFile } from '@tauri-apps/api/fs';

function App() {
  return (
    <div>
      <AppBar title="Hello World">
        <Toolbar>
          <Typography variant="h2">Tauri App</Typography>
        </Toolbar>
      </AppBar>
      <main style={{ width: '100%', height: '100%' }}>
        <Box mx="auto" my="auto">
          <Button
            variant='contained'
            color='primary'
            onClick={async () => {
              await writeFile('test.txt', 'Hello World')
            }}
          >
            Write File
          </Button>
        </Box>
      </main>
    </div>
  );
}

export default App;
