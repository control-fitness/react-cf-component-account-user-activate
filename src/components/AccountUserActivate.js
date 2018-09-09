/* globals window */

import React, { PureComponent } from 'react';
import {
  Grid,
  Card,
  Container,
  Loader,
  Image,
  Icon,
  Button,
} from 'semantic-ui-react';
import Cdn from 'react-cf-helper-cdn';
import I18n from 'react-cf-helper-i18n';
import queryString from 'query-string';
import { Cookies } from 'react-cf-graphql-client';
import request from '../api/request';
import {
  Body,
  PrimaryText,
  SecondaryText,
  FooterText,
  LoaderContainer,
} from './style';

class AccountUserActivate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
    };
  }

  componentDidMount() {
    // parse query string
    const params = queryString.parse(window.location.search);

    // set cf-tenant cookie
    Cookies.set('cf-tenant', params.tenant, { expires: 365 });

    request(params.confirmed_token).then((result) => {
      // set cf-token cookie
      Cookies.set('cf-token', result.data.accountUserActivate.token, { expires: 365 });

      // change state succes
      this.setState({ success: true });
    }).catch(() => {
      // redirecto to error component
      window.location = '/account/user/activate/error';
    });
  }

  renderButtonOrTexts() {
    const { success } = this.state;
    let component = null;
    if (success) {
      component = (
        <Card.Content textAlign="center">
          <PrimaryText>
            {I18n.t('account.user.activated.title')}
          </PrimaryText>
          <SecondaryText>
            {I18n.t('account.user.activated.message')}
          </SecondaryText>
          <Button
            basic
            color="blue"
            content={I18n.t('form.buttons.continue')}
            onClick={() => { window.location = '/'; }}
          />
        </Card.Content>
      );
    } else {
      component = (
        <Card.Content>
          <PrimaryText>
            {I18n.t('account.user.activate.title')}
          </PrimaryText>
          <SecondaryText>
            {I18n.t('account.user.activate.message')}
          </SecondaryText>
        </Card.Content>
      );
    }
    return component;
  }

  renderIconOrLoader() {
    const { success } = this.state;
    let component = null;
    if (success) {
      component = (<Icon size="huge" color="green" name="check circle outline" />);
    } else {
      component = (<Loader size="huge" active inline="centered" />);
    }
    return component;
  }

  render() {
    return (
      <Body>
        <Grid stackable centered columns={1}>
          <Grid.Column
            computer="ten"
            widescreen="ten"
            tablet="ten"
            mobile="ten"
            largeScreen="seven"
          >
            <Image
              src={Cdn.image('logo-text-296-40.svg')}
              width={236}
              height={32}
              centered
            />
            <Card fluid>
              <Container>
                <LoaderContainer>
                  {this.renderIconOrLoader()}
                </LoaderContainer>
              </Container>
              { this.renderButtonOrTexts() }
            </Card>
            <FooterText>
              {I18n.t('copyright')}
            </FooterText>
            <FooterText>
              {I18n.t('account.create.success.help')}
            </FooterText>
          </Grid.Column>
        </Grid>
      </Body>
    );
  }
}

export default AccountUserActivate;
