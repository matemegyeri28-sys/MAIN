import { createServer } from 'node:http';
import { parse } from 'node:url';
import { fetchContent, createCreativeIdeas, platformVariations, planSchedule, summarizeWorkspace } from '@main/shared';

const state = {
  campaigns: [],
  creatives: [],
  schedule: []
};

const server = createServer(async (req, res) => {
  const url = parse(req.url, true);
  setCors(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    if (req.method === 'GET' && url.pathname === '/health') {
      respond(res, 200, { status: 'ok' });
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/campaigns') {
      respond(res, 200, {
        campaigns: state.campaigns,
        creatives: state.creatives,
        schedule: state.schedule,
        summary: summarizeWorkspace(state)
      });
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/campaigns') {
      const body = await readJson(req);
      const { url: targetUrl, name, platforms = ['facebook', 'instagram'] } = body;
      if (!targetUrl) {
        respond(res, 400, { error: 'Missing url field' });
        return;
      }

      const content = await fetchContent(targetUrl);
      const baseCreative = createCreativeIdeas(content.text, content.images);
      const variations = platformVariations(baseCreative, platforms);
      const schedule = planSchedule(variations);

      const campaign = {
        id: `cmp-${Date.now()}`,
        name: name || content.text.slice(0, 60) || 'Untitled campaign',
        url: targetUrl,
        createdAt: new Date().toISOString()
      };

      state.campaigns.push(campaign);
      state.creatives.push(...variations.map((item) => ({ ...item, campaignId: campaign.id })));
      state.schedule.push(...schedule.map((slot) => ({ ...slot, campaignId: campaign.id })));

      respond(res, 201, {
        campaign,
        creatives: state.creatives.filter((item) => item.campaignId === campaign.id),
        schedule: state.schedule.filter((item) => item.campaignId === campaign.id)
      });
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/creatives/preview') {
      const body = await readJson(req);
      const { text, images = [], platforms = ['facebook'] } = body;
      if (!text) {
        respond(res, 400, { error: 'Missing text field' });
        return;
      }
      const base = createCreativeIdeas(text, images);
      const variations = platformVariations(base, platforms);
      respond(res, 200, { creatives: variations, schedule: planSchedule(variations) });
      return;
    }

    respond(res, 404, { error: 'Not found' });
  } catch (error) {
    console.error(error);
    respond(res, 500, { error: error.message });
  }
});

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 1e6) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (error) {
        reject(new Error('Invalid JSON payload'));
      }
    });
    req.on('error', reject);
  });
}

function respond(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body)
  });
  res.end(body);
}

const port = Number(process.env.PORT || 4000);
server.listen(port, () => {
  console.log(`Marketing automation API listening on http://localhost:${port}`);
});
