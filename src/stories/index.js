import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text, boolean, number, object } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';
import IdentityAvatar from '../Avatar';
import { TextAreaForm, ReplyForm, CommentForm } from '../CommentForm';
import Header from '../Header';
import TranslationsContext from '../Translations';
import EntityExample from '../img/entityExample.svg';
import Context from '../Context';
import { SocialBadges } from '../ShowPage';

storiesOf('Components', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '600px',
        height: '100vh',
        margin: '0 auto'
      }}
    >
      {story()}
    </div>
  ))
  .add('Avatar', () => {
    const size = select(
      'Size',
      {
        small: 'Small',
        medium: 'Medium',
        large: 'Large'
      },
      'small'
    );

    return <IdentityAvatar size={size} src={EntityExample} backgroundColor={text('Background color')} />;
  })
  .add('Comment Form', () => <TextAreaForm Form={CommentForm} placeholder={text('Placeholder', 'Placeholder')} />)
  .add('Reply Form', () => <TextAreaForm Form={ReplyForm} placeholder={text('Placeholder', 'Placeholder')} />)
  .add('Header', () => {
    const translations = {
      entityName: text('Entity Name', 'Kitty'),
      noEntitiesError: text('No Entities Error', 'No cats found')
    };
    const activeEntity = object('Active cat', {
      image_url: 'https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/663451.svg',
      name: null,
      id: '123'
    });
    const entityStore = {
      activeEntity,
      myEntities: [activeEntity],
      getEntity() {
        return activeEntity;
      },
      changeActiveEntityTo: action('Change active entity to')
    };
    const web3Store = {
      provider: boolean('Metamask enabled', false),
      from: boolean('Metamask unlocked', false)
    };
    return (
      <MemoryRouter>
        <Context.Provider value={{ entityStore, web3Store }}>
          <TranslationsContext.Provider value={translations}>
            <Header />
          </TranslationsContext.Provider>
        </Context.Provider>
      </MemoryRouter>
    );
  })
  .add('SocialBadges', () => {
    const feedStore = { label: action('Label') };
    const entity = object('Entity', {
      image_url: 'https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/663451.svg',
      url: 'https://www.cryptokitties.co/kitty/663451',
      name: null,
      color: 'pink',
      id: '123'
    });
    const entityStore = {
      getEntity(id) {
        return entity;
      }
    };
    return (
      <Context.Provider value={{ feedStore, entityStore }}>
        <SocialBadges
          id={entity.id}
          editable={boolean('editable')}
          facebook={text('facebook')}
          twitter={text('twitter')}
          instagram={text('instagram')}
          github={text('github')}
        />
      </Context.Provider>
    );
  });